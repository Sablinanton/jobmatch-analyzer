from fastapi import APIRouter, status
from fastapi.params import Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.resume import ResumeResponse, ResumeCreate
from app.services.resume_service import ResumeService

router = APIRouter(prefix="/resumes", tags=["Resumes"])

@router.post('/', response_model=ResumeResponse, status_code=status.HTTP_201_CREATED)
def create_resume(data: ResumeCreate, db: Session = Depends(get_db)):
    service = ResumeService(db)
    return service.create_resume(data)


@router.get('/', response_model=list[ResumeResponse])
def list_resumes(db: Session = Depends(get_db)):
    service = ResumeService(db)
    return service.list_resumes()


@router.get('/{resume_id}', response_model=ResumeResponse)
def get_resume(resume_id: int, db: Session = Depends(get_db)):
    service = ResumeService(db)
    return service.get_resume_by_id(resume_id)

@router.delete('/{resume_id}', status_code=status.HTTP_200_OK)
def delete_resume(resume_id: int, db: Session = Depends(get_db)):
    service = ResumeService(db)
    return service.delete_resume(resume_id)