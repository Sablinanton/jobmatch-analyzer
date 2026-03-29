from datetime import datetime

from pydantic import BaseModel, Field


class ResumeCreate(BaseModel):
    title: str = Field(min_length=1, max_length=255)
    candidate_name: str = Field(min_length=1, max_length=255)
    desired_position: str = Field(min_length=1, max_length=255)
    years_of_experience: int = Field(0, ge=0)
    raw_text: str = Field(min_length=1)


class ResumeResponse(BaseModel):
    id: int
    title: str
    candidate_name: str
    desired_position: str
    years_of_experience: int
    raw_text: str
    created_at: datetime

    model_config = {'from_attributtes': True}