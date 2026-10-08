from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.entities import BlogPost, BlogCategory, User
from app.schemas.entities import (
    BlogPostResponse, BlogPostCreate, BlogPostUpdate,
    BlogCategoryResponse, BlogCategoryBase
)
from app.utils.security import get_current_user

router = APIRouter(prefix="/blog", tags=["Blog"])

@router.get("/categories", response_model=List[BlogCategoryResponse])
def get_categories(db: Session = Depends(get_db)):
    return db.query(BlogCategory).all()

@router.post("/categories", response_model=BlogCategoryResponse, status_code=status.HTTP_201_CREATED)
def create_category(payload: BlogCategoryBase, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    existing = db.query(BlogCategory).filter(BlogCategory.slug == payload.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Category slug already exists")
    cat = BlogCategory(**payload.model_dump())
    db.add(cat)
    db.commit()
    db.refresh(cat)
    return cat

@router.get("", response_model=List[BlogPostResponse])
def get_posts(category_id: Optional[int] = None, published_only: bool = True, db: Session = Depends(get_db)):
    query = db.query(BlogPost)
    if published_only:
        query = query.filter(BlogPost.is_published == True)
    if category_id:
        query = query.filter(BlogPost.category_id == category_id)
    return query.order_by(BlogPost.published_at.desc(), BlogPost.id.desc()).all()

@router.get("/{slug}", response_model=BlogPostResponse)
def get_post_by_slug(slug: str, db: Session = Depends(get_db)):
    post = db.query(BlogPost).filter(BlogPost.slug == slug).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return post

@router.post("", response_model=BlogPostResponse, status_code=status.HTTP_201_CREATED)
def create_post(payload: BlogPostCreate, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    existing = db.query(BlogPost).filter(BlogPost.slug == payload.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Post slug already exists")
    post = BlogPost(**payload.model_dump())
    db.add(post)
    db.commit()
    db.refresh(post)
    return post

@router.put("/{post_id}", response_model=BlogPostResponse)
def update_post(post_id: int, payload: BlogPostUpdate, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    for key, val in payload.model_dump(exclude_unset=True).items():
        setattr(post, key, val)
    db.commit()
    db.refresh(post)
    return post

@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(post_id: int, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    db.delete(post)
    db.commit()
    return None
