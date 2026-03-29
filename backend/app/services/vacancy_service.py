from sqlalchemy.orm import Session

from app.repositories.vacancy_repository import VacancyRepository
from app.schemas.vacancy import VacancyCreate


class VacancyService:
    def __init__(self, db: Session):
        self.repository = VacancyRepository(db)

    def create_vacancy(self, data: VacancyCreate):
        return self.repository.create(data)

    def list_vacancies(self):
        return self.repository.get_all()