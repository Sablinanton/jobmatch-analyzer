from sqlalchemy.orm import Session

from app.models import Resume
from app.schemas.resume import ResumeCreate


class ResumeRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, data: ResumeCreate) -> Resume:
        resume = Resume(**data.model_dump())
        self.db.add(resume)
        self.db.commit()
        self.db.refresh(resume)
        return resume

    def get_all(self):
        return self.db.query(Resume).order_by(Resume.id.desc()).all()