from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.entities import AIKnowledge, AISetting, AIConversation, User
from app.schemas.entities import (
    AIChatRequest, AIChatResponse,
    AIKnowledgeResponse, AIKnowledgeCreate, AIKnowledgeUpdate,
    AISettingResponse, AISettingUpdate
)
from app.services.ai_service import JeesaAIService
from app.utils.security import get_current_user
from app.utils.rate_limiter import check_ai_rate_limit

router = APIRouter(prefix="/ai", tags=["Jeesa AI"])

@router.post("/chat", response_model=AIChatResponse)
async def chat(payload: AIChatRequest, request: Request, db: Session = Depends(get_db)):
    check_ai_rate_limit(request)
    result = await JeesaAIService.process_chat(
        db=db,
        message=payload.message,
        session_id=payload.session_id
    )
    return result

@router.get("/settings", response_model=AISettingResponse)
def get_ai_settings(db: Session = Depends(get_db)):
    setting = db.query(AISetting).first()
    if not setting:
        setting = AISetting()
        db.add(setting)
        db.commit()
        db.refresh(setting)
    return setting

@router.put("/settings", response_model=AISettingResponse)
def update_ai_settings(payload: AISettingUpdate, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    setting = db.query(AISetting).first()
    if not setting:
        setting = AISetting()
        db.add(setting)
    for key, val in payload.model_dump(exclude_unset=True).items():
        setattr(setting, key, val)
    db.commit()
    db.refresh(setting)
    return setting

@router.get("/knowledge", response_model=List[AIKnowledgeResponse])
def get_knowledge_items(category: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(AIKnowledge)
    if category:
        query = query.filter(AIKnowledge.category == category)
    return query.order_by(AIKnowledge.id.desc()).all()

@router.post("/knowledge", response_model=AIKnowledgeResponse, status_code=status.HTTP_201_CREATED)
def add_knowledge_item(payload: AIKnowledgeCreate, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    item = AIKnowledge(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.put("/knowledge/{item_id}", response_model=AIKnowledgeResponse)
def update_knowledge_item(item_id: int, payload: AIKnowledgeUpdate, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    item = db.query(AIKnowledge).filter(AIKnowledge.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Knowledge item not found")
    for key, val in payload.model_dump(exclude_unset=True).items():
        setattr(item, key, val)
    db.commit()
    db.refresh(item)
    return item

@router.delete("/knowledge/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_knowledge_item(item_id: int, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    item = db.query(AIKnowledge).filter(AIKnowledge.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Knowledge item not found")
    db.delete(item)
    db.commit()
    return None

@router.get("/conversations")
def get_conversations(limit: int = 50, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    convs = db.query(AIConversation).order_by(AIConversation.updated_at.desc()).limit(limit).all()
    res = []
    for c in convs:
        res.append({
            "id": c.id,
            "session_id": c.session_id,
            "created_at": c.created_at,
            "message_count": len(c.messages),
            "messages": [{"sender": m.sender, "message": m.message, "created_at": m.created_at} for m in c.messages]
        })
    return res
