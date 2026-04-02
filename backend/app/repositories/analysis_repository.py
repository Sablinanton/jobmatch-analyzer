from sqlalchemy.orm import Session

from app.models import Analysis
from app.schemas.analysis import AnalysisCreate


class AnalysisRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, data: AnalysisCreate) -> Analysis:
        analysis = Analysis(**data.model_dump())
        self.db.add(analysis)
        self.db.commit()
        self.db.refresh(analysis)
        return analysis

    def get_all(self) -> list[Analysis]:
        return self.db.query(Analysis).order_by(Analysis.id.desc()).all()