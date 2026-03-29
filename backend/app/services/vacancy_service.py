from fastapi import HTTPException
from sqlalchemy.orm import Session
from starlette import status

from app.repositories.vacancy_repository import VacancyRepository
from app.schemas.vacancy import VacancyCreate


class VacancyService:
    def __init__(self, db: Session):
        self.repository = VacancyRepository(db)

    def create_vacancy(self, data: VacancyCreate):
        return self.repository.create(data)

    def list_vacancies(self):
        return self.repository.get_all()

    def get_vacancy_by_id(self, vacancy_id: int):
        vacancy = self.repository.get_by_id(vacancy_id)
        if not vacancy:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail='Vacancy not found'
            )
        return vacancy

    def delete_vacancy(self, vacancy_id: int):
        vacancy = self.repository.get_by_id(vacancy_id)
        if not vacancy:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail='Vacancy not found'
            )

        self.repository.delete(vacancy)
        return {'message': 'Vacancy deleted successfully'}