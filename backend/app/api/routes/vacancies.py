from fastapi import APIRouter, status
from fastapi.params import Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.vacancy import VacancyResponse, VacancyCreate
from app.services.vacancy_service import VacancyService

router = APIRouter(prefix="/vacancies", tags=["Vacancies"])

@router.post('/', response_model=VacancyResponse, status_code=status.HTTP_201_CREATED)
def create_vacancy(data: VacancyCreate, db: Session = Depends(get_db)):
    service = VacancyService(db)
    return service.create_vacancy(data)


@router.get('/', response_model=list[VacancyResponse])
def list_vacancies(db: Session = Depends(get_db)):
    service = VacancyService(db)
    return service.list_vacancies()


@router.get('/{vacancy_id}', response_model=VacancyResponse)
def get_vacancy(vacancy_id: int, db: Session = Depends(get_db)):
    service = VacancyService(db)
    return service.get_vacancy_by_id(vacancy_id)

@router.delete('/{vacancy_id}', status_code=status.HTTP_200_OK)
def delete_vacancy(vacancy_id: int, db: Session = Depends(get_db)):
    service = VacancyService(db)
    return service.delete_vacancy(vacancy_id)