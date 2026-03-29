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

    def get_all(self):
        return self.db.query(Vacancy).order_by(Vacancy.id.desc()).all()