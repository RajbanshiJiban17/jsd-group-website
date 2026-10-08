import re
import json
import logging
from typing import List, Dict, Tuple, Optional
import httpx
from sqlalchemy.orm import Session
from app.config import settings
from app.models.entities import (
    CompanySetting, Service, Project, Course, Job, AIKnowledge, AISetting,
    AIConversation, AIMessage
)

logger = logging.getLogger("uvicorn.error")

class JeesaAIService:
    @staticmethod
    def is_safety_violation(message: str) -> bool:
        lowered = message.lower()
        forbidden_keywords = [
            "password", "secret key", "api key", "admin password", "database password",
            "jwt secret", "sql injection", "drop table", "select * from users",
            "credentials", "system prompt", "internal prompt", "ignore previous instructions",
            "jailbreak", "bypass security"
        ]
        return any(k in lowered for k in forbidden_keywords)

    @staticmethod
    def is_greeting(message: str) -> bool:
        lowered = message.lower().strip()
        greetings = [
            "hello", "hi", "namaste", "namaskar", "hey", "hola",
            "नमस्ते", "नमस्कार", "हेलो", "हाई"
        ]
        return lowered in greetings or any(lowered.startswith(g) and len(lowered) < 15 for g in greetings)

    @staticmethod
    def is_thank_you(message: str) -> bool:
        lowered = message.lower().strip()
        thanks = [
            "thank you", "thanks", "thx", "dhanyabad", "dhanyabaad",
            "धन्यवाद", "धन्यवाद है", "धन्नेवाद", "thank you so much"
        ]
        return any(t in lowered for t in thanks)

    @staticmethod
    def is_revenue_or_unverified_query(message: str) -> bool:
        lowered = message.lower()
        unverified_patterns = [
            "revenue", "profit", "kamai", "turnover", "valuation", "earning",
            "clients", "client list", "client ko ho", "ग्राहक", "कति कमाउँछ",
            "awards", "partnership with google", "branches", "शाखा"
        ]
        return any(p in lowered for p in unverified_patterns)

    @staticmethod
    def search_knowledge_base(db: Session, query: str) -> Tuple[List[Dict[str, str]], List[str]]:
        """
        Retrieves relevant company records and knowledge items from SQLite database.
        """
        lowered = query.lower()
        retrieved_items = []
        sources = []

        # 1. Company Information
        company = db.query(CompanySetting).first()
        if company:
            company_text = (
                f"Company: {company.company_name}\n"
                f"Tagline: {company.tagline}\n"
                f"Description: {company.description}\n"
                f"Mission: {company.mission}\n"
                f"Vision: {company.vision}\n"
                f"Values: {company.values}\n"
                f"Founder: {company.founder_name} ({company.founder_role})\n"
                f"Founder Bio: {company.founder_bio}\n"
                f"Location: {company.location}\n"
                f"Phone: {company.phone}\n"
                f"Email: {company.email}\n"
                f"GitHub: {company.github}\n"
                f"LinkedIn: {company.linkedin}\n"
                f"Website: {company.personal_website}\n"
            )
            retrieved_items.append({"category": "Company & Founder", "content": company_text})
            sources.append("Company Profile")

        # 2. Services
        services = db.query(Service).filter(Service.is_active == True).all()
        matching_services = []
        for s in services:
            if (s.title.lower() in lowered or 
                any(w in lowered for w in ["service", "services", "काम", "सेवा", "sewa", "kaam", "ai", "web", "software"])):
                matching_services.append(f"- {s.title}: {s.short_description} (Tech: {s.technologies})")
            elif any(tech.strip().lower() in lowered for tech in s.technologies.split(",")):
                matching_services.append(f"- {s.title}: {s.short_description}")
        if matching_services:
            retrieved_items.append({"category": "Services", "content": "\n".join(matching_services[:5])})
            sources.append("Services Database")

        # 3. Projects
        projects = db.query(Project).all()
        matching_projects = []
        for p in projects:
            if (p.title.lower() in lowered or 
                p.slug in lowered or
                any(w in lowered for w in ["project", "projects", "काम", "product", "retailiq", "agriculture", "churn", "sangini", "rag"])):
                matching_projects.append(
                    f"- {p.title}: {p.summary}\n  Tech: {p.technologies}\n  Solution: {p.solution or ''}"
                )
        if matching_projects:
            retrieved_items.append({"category": "Projects", "content": "\n\n".join(matching_projects[:4])})
            sources.append("Projects Database")

        # 4. Courses
        courses = db.query(Course).filter(Course.is_active == True).all()
        matching_courses = []
        for c in courses:
            if (c.title.lower() in lowered or 
                any(w in lowered for w in ["course", "courses", "training", "कक्षा", "सिक्ने", "python", "data science", "analytics"])):
                matching_courses.append(
                    f"- {c.title}: Duration: {c.duration}, Level: {c.level}, Instructor: {c.instructor}, Batch: {c.batch}, Price: {c.price}\n  Summary: {c.summary}"
                )
        if matching_courses:
            retrieved_items.append({"category": "Courses", "content": "\n\n".join(matching_courses[:4])})
            sources.append("Courses Database")

        # 5. Careers
        if any(w in lowered for w in ["job", "career", "vacancy", "intern", "hiring", "काम"]):
            jobs = db.query(Job).filter(Job.is_active == True).all()
            if jobs:
                job_list = [f"- {j.title} ({j.department}, {j.location}, Type: {j.type})" for j in jobs]
                retrieved_items.append({"category": "Careers", "content": "\n".join(job_list)})
                sources.append("Careers Database")

        # 6. Dedicated AI Knowledge base
        knowledge_entries = db.query(AIKnowledge).filter(AIKnowledge.is_active == True).all()
        matching_k = []
        for k in knowledge_entries:
            k_words = (k.keywords or "").lower().split(",")
            if any(kw.strip() in lowered for kw in k_words if kw.strip()) or k.title.lower() in lowered:
                matching_k.append(f"[{k.category}] {k.title}: {k.content}")
        if matching_k:
            retrieved_items.append({"category": "Verified Knowledge Base", "content": "\n".join(matching_k[:3])})
            sources.append("AI Knowledge Base")

        return retrieved_items, list(set(sources))

    @staticmethod
    def answer_with_local_engine(
        db: Session,
        message: str,
        retrieved_items: List[Dict[str, str]],
        sources: List[str],
        ai_setting: AISetting
    ) -> str:
        lowered = message.lower().strip()
        company = db.query(CompanySetting).first()

        # 1. Company inquiries
        if any(w in lowered for w in ["jsd group le k", "jsd group k ho", "company bare", "company ko barema", "about jsd", "jsd group ke ho", "k kaam garcha"]):
            return (
                f"JSD Group एक प्रविधि तथा डिजिटल समाधान कम्पनी हो, जसले practical AI, data analytics, सफ्टवेयर विकास र डिजिटल उत्पादनहरू निर्माण गर्छ।\n\n"
                f"हाम्रो मुख्य उद्देश्य: '{company.tagline if company else 'Building Intelligent Solutions for a Digital Future.'}'\n\n"
                f"हामी AI Solutions, Machine Learning, Web/Software Development तथा Data Analysis जस्ता सेवाहरू प्रदान गर्छौं।"
            )

        # 2. Founder inquiries
        if any(w in lowered for w in ["founder", "founder ko ho", "ceo", "jiban", "jiban chaudhary", "who founded"]):
            name = company.founder_name if company else "Jiban Chaudhary"
            role = company.founder_role if company else "Founder & Technology Lead"
            bio = company.founder_bio if company else "Technology Lead in Python, AI/ML and Software Development"
            return (
                f"JSD Group का संस्थापक {name} हुनुहुन्छ, जसको भूमिका {role} हो।\n\n"
                f"उहाँ Python, Data Science, Machine Learning, FastAPI र Web Development मा सक्रिय प्राविधिक नेतृत्व प्रदान गर्नुहुन्छ।\n\n"
                f"थप विवरणका लागि Founder को GitHub: {company.github if company else 'RajbanshiJiban17'} वा LinkedIn हेर्न सक्नुहुन्छ।"
            )

        # 3. Contact inquiries
        if any(w in lowered for w in ["contact", "phone", "email", "location", "address", "सम्पर्क", "कहाँ छ", "फोन", "इमेल"]):
            loc = company.location if company else "Nepalgunj-10, Adarshnagar, Banke, Nepal"
            ph = company.phone if company else "9868837762"
            em = company.email if company else "jibanchy233@gmail.com"
            return (
                f"JSD Group सँग सम्पर्क गर्नका लागि विवरणहरू:\n\n"
                f"📍 ठेगाना: {loc}\n"
                f"📞 फोन: {ph}\n"
                f"✉️ इमेल: {em}\n\n"
                f"तपाईं हाम्रो वेबसाइटको Contact पृष्ठ वा 'Let's Talk' फारममार्फत पनि सन्देश पठाउन सक्नुहुन्छ।"
            )

        # 4. Services inquiries
        if any(w in lowered for w in ["service", "services", "सेवा", "ai service", "web development", "machine learning", "k k service"]):
            services = db.query(Service).filter(Service.is_active == True).limit(6).all()
            titles = ", ".join([s.title for s in services]) if services else "AI Solutions, Data Analysis, Web Development, Software Development"
            return (
                f"JSD Group ले मुख्यतया निम्न सेवाहरू प्रदान गर्छ:\n\n"
                f"• **AI Solutions & AI Automation**: व्यवसायका लागि अनुकूलित AI र automation प्रणाली।\n"
                f"• **Data Analysis & Machine Learning**: Data-driven निर्णय र predictive analytics।\n"
                f"• **Web & Software Development**: Next.js, Python, FastAPI मा आधारित आधुनिक प्रणालीहरू।\n"
                f"• **Digital Marketing & IT Consulting**\n\n"
                f"तपाईंलाई कुन सेवा सम्बन्धी थप परामर्श वा प्रोजेक्ट सुरू गर्न मन छ?"
            )

        # 5. RetailIQ or specific project inquiries
        if "retailiq" in lowered or "retail iq" in lowered:
            return (
                f"**RetailIQ Nepal** साना तथा मझौला व्यवसायहरू (SMEs) का लागि JSD Group द्वारा विकास गरिएको एक Business Analytics Platform हो।\n\n"
                f"मुख्य विशेषताहरू:\n"
                f"• Sales Analytics & Dashboard\n"
                f"• Product Performance & Inventory Insights\n"
                f"• Low Stock Detection\n"
                f"• AI-assisted Business Insights\n\n"
                f"तपाईं यसको डेमो Request गर्न वा Solutions पृष्ठमा थप अवलोकन गर्न सक्नुहुन्छ।"
            )

        if any(w in lowered for w in ["project", "projects", "smart agriculture", "churn", "sangini"]):
            projects = db.query(Project).all()
            p_names = "\n".join([f"• **{p.title}**: {p.summary}" for p in projects[:4]])
            return (
                f"JSD Group का केही प्रमुख वास्तविक प्रोजेक्टहरू:\n\n{p_names}\n\n"
                f"हाम्रो Projects पृष्ठमा यी सबैको architecture, GitHub लिंक र demo उपलब्ध छन्।"
            )

        # 6. Courses inquiries
        if any(w in lowered for w in ["course", "courses", "training", "data science course", "python course", "पढाइ", "सिक्न"]):
            courses = db.query(Course).filter(Course.is_active == True).all()
            c_details = "\n".join([f"• **{c.title}** ({c.duration}, {c.level}) - Batch: {c.batch}" for c in courses[:4]])
            return (
                f"JSD Group मा हाल उपलब्ध कोर्षहरू:\n\n{c_details}\n\n"
                f"यी कोर्षहरू practical hands-on प्रोजेक्टमा आधारित छन्। भर्ना वा थप जानकारीका लागि Courses पृष्ठमा हेर्न सक्नुहुन्छ।"
            )

        # 7. Careers inquiries
        if any(w in lowered for w in ["job", "career", "vacancy", "intern", "hiring"]):
            jobs = db.query(Job).filter(Job.is_active == True).all()
            if jobs:
                j_list = "\n".join([f"• **{j.title}** ({j.department}, {j.location})" for j in jobs[:4]])
                return (
                    f"हाल JSD Group मा खुला रहेका अवसरहरू:\n\n{j_list}\n\n"
                    f"तपाईं हाम्रो Careers पृष्ठबाट सिधै आफ्नो CV सहित Apply गर्न सक्नुहुन्छ।"
                )
            else:
                return "अहिले नयाँ vacancy खुला छैन, तर तपाईं हाम्रो Careers पृष्ठबाट general talent pool का लागि आवेदन दिन सक्नुहुन्छ।"

        # 8. Technology Help (General tech questions like Python, SQL, etc.)
        if ai_setting.allow_general_tech_answers:
            if "python" in lowered and any(k in lowered for k in ["list", "what is", "k ho", "कसरी", "how to"]):
                return (
                    f"[General Technical Knowledge]\n\n"
                    f"Python मा List बनाउन square brackets `[]` प्रयोग गरिन्छ।\n\n"
                    f"उदाहरण:\n"
                    f"```python\n"
                    f"my_list = ['AI', 'Data', 'Web']\n"
                    f"my_list.append('FastAPI')\n"
                    f"print(my_list)\n"
                    f"```\n\n"
                    f"List ordered र mutable (परिवर्तन गर्न सकिने) data type हो।"
                )
            if "machine learning" in lowered or "ml" in lowered and any(k in lowered for k in ["k ho", "what is"]):
                return (
                    f"[General Technical Knowledge]\n\n"
                    f"Machine Learning भनेको data बाट pattern सिकेर prediction वा decision गर्न प्रयोग हुने technology हो। यसमा स्पष्ट नियमहरू कोडिङ गर्नुको सट्टा data मार्फत algorithm लाई train गराइन्छ।"
                )
            if "fastapi" in lowered and any(k in lowered for k in ["k ho", "what is"]):
                return (
                    f"[General Technical Knowledge]\n\n"
                    f"FastAPI Python मा modern, high-performance REST API बनाउन प्रयोग हुने asynchronous framework हो। यो Pydantic र Starlette मा आधारित छ।"
                )

        # 9. Fallback when unverified
        return ai_setting.unverified_fallback

    @classmethod
    async def process_chat(
        cls,
        db: Session,
        message: str,
        session_id: Optional[str] = None
    ) -> Dict[str, any]:
        # Clean message
        cleaned_msg = message.strip()
        if not cleaned_msg:
            return {
                "answer": "कृपया कुनै प्रश्न सोध्नुहोस्।",
                "sources_used": [],
                "session_id": session_id or "default"
            }

        # 1. Fetch AI Settings
        ai_setting = db.query(AISetting).first()
        if not ai_setting:
            ai_setting = AISetting()
            db.add(ai_setting)
            db.commit()
            db.refresh(ai_setting)

        # 2. Check for Security Violation
        if cls.is_safety_violation(cleaned_msg):
            return {
                "answer": "गोपनीयता तथा सुरक्षाका कारणले internal credentials वा संवेदनशील प्रणाली जानकारी प्रदान गर्न सकिँदैन।",
                "sources_used": ["Safety Protocol"],
                "session_id": session_id or "default"
            }

        # 3. Check for Greeting
        if cls.is_greeting(cleaned_msg):
            return {
                "answer": ai_setting.welcome_message,
                "sources_used": ["Jeesa AI Greeting"],
                "session_id": session_id or "default"
            }

        # 4. Check for Thank You
        if cls.is_thank_you(cleaned_msg):
            return {
                "answer": ai_setting.thank_you_message,
                "sources_used": ["Polite Response"],
                "session_id": session_id or "default"
            }

        # 5. Check for Hallucination-prone unverified queries (revenue, private clients, fake awards)
        if cls.is_revenue_or_unverified_query(cleaned_msg):
            return {
                "answer": ai_setting.unverified_fallback,
                "sources_used": ["Hallucination Guardrail"],
                "session_id": session_id or "default"
            }

        # 6. Retrieve verified knowledge from SQLite DB
        retrieved_items, sources = cls.search_knowledge_base(db, cleaned_msg)

        # 7. Check if external LLM API is configured (Gemini or OpenAI)
        external_key = settings.AI_API_KEY
        if external_key and len(external_key) > 10:
            try:
                # Build context for LLM with strict ground truth instructions
                context_str = "\n\n".join([f"[{item['category']}]\n{item['content']}" for item in retrieved_items])
                prompt = (
                    f"{ai_setting.personality_prompt}\n\n"
                    f"STRICT RULES:\n"
                    f"1. You are Jeesa AI, official assistant of JSD Group.\n"
                    f"2. Primary language: Nepali with natural technical English words.\n"
                    f"3. STRICT HALLUCINATION CONTROL: Use ONLY the verified company context below.\n"
                    f"4. If verified info is not available, respond strictly with: '{ai_setting.unverified_fallback}'.\n"
                    f"5. Keep answer concise (2-5 short paragraphs or bullet points).\n\n"
                    f"VERIFIED COMPANY CONTEXT:\n{context_str}\n\n"
                    f"USER QUERY: {cleaned_msg}\n"
                )

                if settings.AI_PROVIDER == "openai":
                    async with httpx.AsyncClient(timeout=15.0) as client:
                        resp = await client.post(
                            "https://api.openai.com/v1/chat/completions",
                            headers={"Authorization": f"Bearer {external_key}"},
                            json={
                                "model": settings.AI_MODEL or "gpt-4o-mini",
                                "messages": [{"role": "user", "content": prompt}],
                                "temperature": 0.2
                            }
                        )
                        if resp.status_code == 200:
                            data = resp.json()
                            answer = data["choices"][0]["message"]["content"]
                            return {
                                "answer": answer,
                                "sources_used": sources or ["JSD Group Verified Database"],
                                "session_id": session_id or "default"
                            }
                elif settings.AI_PROVIDER == "gemini":
                    # Google Gemini API
                    url = f"https://generativelanguage.googleapis.com/v1beta/models/{settings.AI_MODEL or 'gemini-1.5-flash'}:generateContent?key={external_key}"
                    async with httpx.AsyncClient(timeout=15.0) as client:
                        resp = await client.post(
                            url,
                            json={"contents": [{"parts": [{"text": prompt}]}]}
                        )
                        if resp.status_code == 200:
                            data = resp.json()
                            answer = data["candidates"][0]["content"]["parts"][0]["text"]
                            return {
                                "answer": answer,
                                "sources_used": sources or ["JSD Group Verified Database"],
                                "session_id": session_id or "default"
                            }
            except Exception as e:
                logger.warning(f"External LLM call failed, falling back to local deterministic engine: {e}")

        # 8. Use deterministic local engine
        answer = cls.answer_with_local_engine(db, cleaned_msg, retrieved_items, sources, ai_setting)

        # 9. Record conversation in database if session_id is provided
        try:
            if session_id:
                conv = db.query(AIConversation).filter(AIConversation.session_id == session_id).first()
                if not conv:
                    conv = AIConversation(session_id=session_id)
                    db.add(conv)
                    db.commit()
                    db.refresh(conv)

                db.add(AIMessage(
                    conversation_id=conv.id,
                    sender="user",
                    message=cleaned_msg
                ))
                db.add(AIMessage(
                    conversation_id=conv.id,
                    sender="assistant",
                    message=answer,
                    sources_used=",".join(sources) if sources else "Local Knowledge"
                ))
                db.commit()
        except Exception as e:
            logger.error(f"Failed to persist chat message: {e}")

        return {
            "answer": answer,
            "sources_used": sources or ["JSD Group Knowledge Base"],
            "session_id": session_id or "default"
        }
