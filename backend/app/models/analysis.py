from datetime import datetime, UTC

from sqlalchemy import ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import Mapped, mapped_column

from app.db.database import Base

class Analysis(Base):
    __tablename__ = 'analysis'

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    resume_id: Mapped[int] = mapped_column(ForeignKey('resumes.id'), nullable=False)
    vacancy_id: Mapped[int] = mapped_column(ForeignKey('vacancies.id'), nullable=False)
    match_score: Mapped[int] = mapped_column(Integer, nullable=False)
    summary: Mapped[str] = mapped_column(String(500), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC),
        nullable=False
    )