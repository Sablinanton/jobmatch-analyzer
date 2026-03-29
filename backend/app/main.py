from fastapi import FastAPI

from api.routes.resumes import router as resumes_router
from api.routes.vacancies import router as vacancies_router
from app.core.config import settings

app = FastAPI(title=settings.app_name)

@app.get("/")
def root():
    return {"message": f"{settings.app_name} is running"}


@app.get('/health')
def health():
    return {"status": "ok"}


app.include_router(resumes_router)
app.include_router(vacancies_router)