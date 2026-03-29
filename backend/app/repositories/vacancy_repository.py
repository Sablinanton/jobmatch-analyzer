from typing import Type

from sqlalchemy.orm import Session

from app.models import Vacancy
from app.schemas.vacancy import VacancyCreate


class VacancyRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, data: VacancyCreate) -> Vacancy:
        vacancy = Vacancy(**data.model_dump())
        self.db.add(vacancy)
        self.db.commit()
        self.db.refresh(vacancy)
        return vacancy

    def get_all(self) -> list[Type[Vacancy]]:
        return self.db.query(Vacancy).order_by(Vacancy.id.desc()).all()

    def get_by_id(self, vacancy_id: int) -> Vacancy | None:
        return self.db.query(Vacancy).filter(Vacancy.id == vacancy_id).first()

    def delete(self, vacancy: Vacancy) -> None:
        self.db.delete(vacancy)
        self.db.commit()