from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.resume import ResumeResponse, ResumeCreate
from app.services.resume_service import ResumeService

router = APIRouter(prefix="/resumes", tags=["Resumes"])

@router.post('/', response_model=ResumeResponse)
def create_resume(data: ResumeCreate, db: Session = Depends(get_db)):
    service = ResumeService(db)
    return service.create_resume(data)


@router.get('/', response_model=list[ResumeResponse])
def list_resumes(db: Session = Depends(get_db)):
    service = ResumeService(db)
    return service.list_resumes()