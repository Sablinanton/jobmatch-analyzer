from fastapi import HTTPException
from sqlalchemy.orm import Session
from starlette import status

from app.repositories.resume_repository import ResumeRepository
from app.schemas.resume import ResumeCreate


class ResumeService:
    def __init__(self, db: Session):
        self.repository = ResumeRepository(db)

    def create_resume(self, data: ResumeCreate):
        return self.repository.create(data)

    def list_resumes(self):
        return self.repository.get_all()

    def get_resume_by_id(self, resume_id: int):
        resume = self.repository.get_by_id(resume_id)
        if not resume:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail='Resume not found'
            )
        return resume

    def delete_resume(self, resume_id: int):
        resume = self.repository.get_by_id(resume_id)
        if not resume:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail='Resume not found'
            )

        self.repository.delete(resume)
        return {'message': 'Resume deleted successfully'}