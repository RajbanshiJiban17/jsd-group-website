import os
import uuid
import aiofiles
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.entities import Media, User
from app.config import settings
from app.utils.security import get_current_user

router = APIRouter(prefix="/media", tags=["Media & Uploads"])

ALLOWED_EXTENSIONS = {
    "png", "jpg", "jpeg", "webp", "svg", "gif",
    "pdf", "doc", "docx"
}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user)
):
    filename = file.filename or "upload"
    ext = filename.split(".")[-1].lower() if "." in filename else ""
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File extension '.{ext}' is not allowed."
        )

    # Generate unique secure filename
    unique_name = f"{uuid.uuid4().hex}.{ext}"
    target_subdir = "images" if ext in {"png", "jpg", "jpeg", "webp", "svg", "gif"} else "cvs"
    target_dir = os.path.join(settings.UPLOAD_DIR, target_subdir)
    os.makedirs(target_dir, exist_ok=True)
    target_path = os.path.join(target_dir, unique_name)

    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File exceeds maximum allowed size of 10MB."
        )

    async with aiofiles.open(target_path, "wb") as f:
        await f.write(content)

    web_path = f"/uploads/{target_subdir}/{unique_name}"
    media_entry = Media(
        filename=filename,
        file_path=web_path,
        file_size=len(content),
        mime_type=file.content_type or "application/octet-stream"
    )
    db.add(media_entry)
    db.commit()
    db.refresh(media_entry)

    return {
        "id": media_entry.id,
        "filename": filename,
        "url": web_path,
        "size": len(content)
    }

@router.post("/public-upload-cv")
async def upload_candidate_cv(file: UploadFile = File(...)):
    """Public endpoint specifically for candidates to attach CV (PDF/DOC up to 10MB)"""
    filename = file.filename or "cv.pdf"
    ext = filename.split(".")[-1].lower() if "." in filename else ""
    if ext not in {"pdf", "doc", "docx"}:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF, DOC, or DOCX files are allowed for CV uploads."
        )

    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="CV file size exceeds 10MB limit."
        )

    unique_name = f"cv_{uuid.uuid4().hex[:12]}.{ext}"
    target_dir = os.path.join(settings.UPLOAD_DIR, "cvs")
    os.makedirs(target_dir, exist_ok=True)
    target_path = os.path.join(target_dir, unique_name)

    async with aiofiles.open(target_path, "wb") as f:
        await f.write(content)

    return {"url": f"/uploads/cvs/{unique_name}"}

@router.get("")
def list_media(db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    return db.query(Media).order_by(Media.id.desc()).all()
