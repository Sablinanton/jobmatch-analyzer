from app.utils.text_normalizer import normalize_text, unique_normalized_skills

KNOWN_SKILLS = [
    "python",
    "fastapi",
    "django",
    "flask",
    "postgresql",
    "sql",
    "docker",
    "git",
    "react",
    "typescript",
    "javascript",
    "redis",
    "celery",
    "rest api",
    "html",
    "css",
    ".net",
    "c#",
    "angular",
    'kafka',
    'rabbitmq',
    'c++',
]


def extract_skills_from_text(text: str) -> list[str]
    normalized_text = normalize_text(text)
    found_skills: list[str] = []

    for skill in KNOWN_SKILLS:
        if skill in normalized_text:
            found_skills.append(skill)

    return unique_normalized_skills(found_skills)