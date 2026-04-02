from datetime import datetime

from pydantic import BaseModel, Field


class AnalysisCompareRequest(BaseModel):
    resume_id: int = Field(gt=0)
    vacancy_id: int = Field(gt=0)


class AnalysisCreate(BaseModel):
    resume_id: int
    vacancy_id: int
    match_score: int
    summary: str


class AnalysisResponse(BaseModel):
    id: int
    resume_id: int
    vacancy_id: int
    match_score: int
    summary: str
    created_at: datetime

    model_config = {'from_attributes': True}


class AnalysisCompareResponse(BaseModel):
    match_score: int
    matched_skills: list[str]
    missing_skills: list[str]
    extra_skills: list[str]
    summary: str
