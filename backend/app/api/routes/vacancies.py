from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.vacancy import VacancyResponse, VacancyCreate
from app.services.vacancy_service import VacancyService

router = APIRouter(prefix="/vacancies", tags=["Vacancies"])

@router.post('/', response_model=VacancyResponse)
def create_vacancy(data: VacancyCreate, db: Session = Depends(get_db)):
    service = VacancyService(db)
    return service.create_vacancy(data)


@router.get('/', response_model=list[VacancyResponse])
def list_vacancies(db: Session = Depends(get_db)):
    service = VacancyService(db)
    return service.list_vacancies()