from sqlalchemy.orm import Session

from app.repositories.resume_repository import ResumeRepository
from app.schemas.resume import ResumeCreate


class ResumeService:
    def __init__(self, db: Session):
        self.repository = ResumeRepository(db)

    def create_resume(self, data: ResumeCreate):
        return self.repository.create(data)

    def list_resumes(self):
        return self.repository.get_all()