from datetime import datetime

from pydantic import BaseModel, Field


class VacancyCreate(BaseModel):
    title: str = Field(min_length=1, max_length=255)
    company: str = Field(min_length=1, max_length=255)
    level: str = Field(min_length=1, max_length=50)
    description: str = Field(min_length=1)
    salary_text: str | None = Field(default=None, max_length=255)


class VacancyResponse(BaseModel):
    id: int
    title: str
    company: str
    level: str
    description: str
    salary_text: str | None
    created_at: datetime

    model_config = {'from_attributtes': True}