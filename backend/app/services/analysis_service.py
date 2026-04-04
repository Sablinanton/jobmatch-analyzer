from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.analysis_repository import AnalysisRepository
from app.repositories.resume_repository import ResumeRepository
from app.repositories.vacancy_repository import VacancyRepository
from app.schemas.analysis import AnalysisCompareResponse, AnalysisCompareRequest, AnalysisCreate
from app.utils.score_calculator import calculate_match_score
from app.utils.skill_extractor import extract_skills_from_text


class AnalysisService:
    def __init__(self, db: Session):
        self.repository = AnalysisRepository(db)
        self.resume_repository = ResumeRepository(db)
        self.vacancy_repository = VacancyRepository(db)

    def compare_resume_with_vacancy(self, data: AnalysisCompareRequest) -> AnalysisCompareResponse:
        resume = self.resume_repository.get_by_id(data.resume_id)
        if not resume:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail='Resume not found',

            )

        vacancy = self.vacancy_repository.get_by_id(data.vacancy_id)
        if not vacancy:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail='Vacancy not found',
            )

        resume_skills = extract_skills_from_text(resume.raw_text)
        vacancy_skills = extract_skills_from_text(vacancy.description)

        resume_set = set(resume_skills)
        vacancy_set = set(vacancy_skills)

        matched_skills = sorted(list(resume_set & vacancy_set))
        missing_skills = sorted(list(vacancy_set - resume_set))
        extra_skills = sorted(list(resume_set - vacancy_set))

        match_score = calculate_match_score(resume_skills, vacancy_skills)
        summary = self._build_summary(match_score, missing_skills)

        self.analysis_repository.create(
            AnalysisCreate(
                resume_id=resume.id,
                vacancy_id=vacancy.id,
                match_score=match_score,
                summary=summary,
            )
        )

        return AnalysisCompareResponse(
            match_score=match_score,
            matched_skills=matched_skills,
            missing_skills=missing_skills,
            extra_skills=extra_skills,
            summary=summary,
        )


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