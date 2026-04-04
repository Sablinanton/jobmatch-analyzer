from fastapi import APIRouter, status
from fastapi.params import Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.analysis import AnalysisCompareResponse, AnalysisCompareRequest, AnalysisResponse
from app.services.analysis_service import AnalysisService

router = APIRouter(prefix="/analyses", tags=["Analyses"])


@router.post('/compare', response_model=AnalysisCompareResponse, status_code=status.HTTP_200_OK)
def compare_resume_with_vacancy(data: AnalysisCompareRequest, db: Session = Depends(get_db)):
    service = AnalysisService(db)
    return service.compare_resume_with_vacancy(data)


@router.get('/', response_model=list[AnalysisResponse])
def list_analyses(db: Session = Depends(get_db)):
    service = AnalysisService(db)
    return service.list_analyses()
