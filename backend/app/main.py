from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.api.routes.resumes import router as resumes_router
from app.api.routes.vacancies import router as vacancies_router
from app.api.routes.analyses import router as analyses_router
from app.core.config import settings

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.get("/")
def root():
    return {"message": f"{settings.app_name} is running"}


@app.get('/health')
def health():
    return {"status": "ok"}


app.include_router(resumes_router)
app.include_router(vacancies_router)
app.include_router(analyses_router)