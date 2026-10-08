from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.entities import ContactMessage, User
from app.schemas.entities import ContactCreate, ContactResponse
from app.utils.security import get_current_user
from app.utils.rate_limiter import check_form_rate_limit
from app.utils.email import send_notification_email

router = APIRouter(prefix="/contact", tags=["Contact"])

@router.post("", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
def submit_contact_message(payload: ContactCreate, request: Request, db: Session = Depends(get_db)):
    check_form_rate_limit(request)
    
    msg = ContactMessage(
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        company=payload.company,
        service_interest=payload.service_interest,
        budget=payload.budget,
        message=payload.message
    )
    db.add(msg)
    db.commit()
    db.refresh(msg)

    # Send email notification
    send_notification_email(
        subject=f"New Website Inquiry from {payload.name} ({payload.company or 'Direct'})",
        body=(
            f"<h3>New Website Inquiry</h3>"
            f"<p><b>Name:</b> {payload.name}</p>"
            f"<p><b>Email:</b> {payload.email}</p>"
            f"<p><b>Phone:</b> {payload.phone or 'N/A'}</p>"
            f"<p><b>Company:</b> {payload.company or 'N/A'}</p>"
            f"<p><b>Service:</b> {payload.service_interest or 'General'}</p>"
            f"<p><b>Budget:</b> {payload.budget or 'N/A'}</p>"
            f"<p><b>Message:</b><br>{payload.message}</p>"
        )
    )
    return msg

@router.get("/admin/messages", response_model=List[ContactResponse])
def get_contact_messages(
    unread_only: bool = False,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user)
):
    query = db.query(ContactMessage)
    if unread_only:
        query = query.filter(ContactMessage.is_read == False)
    return query.order_by(ContactMessage.id.desc()).all()

@router.put("/admin/messages/{message_id}/read")
def toggle_read(message_id: int, is_read: bool = True, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    msg = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    msg.is_read = is_read
    db.commit()
    return {"message": "Read status updated", "is_read": is_read}

@router.put("/admin/messages/{message_id}/replied")
def toggle_replied(message_id: int, is_replied: bool = True, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    msg = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    msg.is_replied = is_replied
    db.commit()
    return {"message": "Replied status updated", "is_replied": is_replied}

@router.delete("/admin/messages/{message_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_message(message_id: int, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    msg = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    db.delete(msg)
    db.commit()
    return None
