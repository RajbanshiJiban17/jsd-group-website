import os
import shutil
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings

# If running on Vercel serverless, copy pre-seeded database to /tmp if it doesn't already exist
if os.environ.get("VERCEL") == "1":
    dest_db = "/tmp/jsd_group.db"
    # Find candidate source DB
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    src_db = os.path.join(base_dir, "jsd_group.db")
    if not os.path.exists(src_db):
        src_db = "jsd_group.db"
    if os.path.exists(src_db) and not os.path.exists(dest_db):
        try:
            shutil.copyfile(src_db, dest_db)
        except Exception:
            pass

# For SQLite, check_same_thread=False is needed for multi-threaded FastAPI
connect_args = {"check_same_thread": False} if settings.DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(
    settings.DATABASE_URL,
    connect_args=connect_args,
    echo=False
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
