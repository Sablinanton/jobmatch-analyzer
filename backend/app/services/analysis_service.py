from sqlalchemy.orm import Session

from app.repositories.analysis_repository import AnalysisRepository
from app.repositories.resume_repository import ResumeRepository
from app.repositories.vacancy_repository import VacancyRepository


class AnalysisService:
    def __init__(self, db: Session):
        self.repository = AnalysisRepository(db)
        self.resume_repository = ResumeRepository(db)
        self.vacancy_repository = VacancyRepository(db)

        def list_analyses(self):
            return self.analysis_repository.get_all()

        @staticmethod
        def _build_summary(match_score: int, missing_skills: list[str]) -> str:
            if match_score >= 80:
                return 'Резюме отлично подходит вакансии'
            if match_score >= 60:
                if missing_skills:
                    return (
                        'Резюме подходит вакансии, но отсутствуют следующие навыки: '
                        + ', '.join(missing_skills) + '.'
                    )
                return 'Хорошее совпадение резюме и вакансии.'
            return 'Резюме не подходит вакансии. Нужно улучшить резюме.'