SYNONYMS = {
    'js': 'javascript',
    'ts': 'typescript',
    'postgres': 'postgresql',
    'postgre': 'postgresql',
    'pg': 'postgresql',
}


def normalize_text(text: str) -> str:
    return ' '.join(text.lower().strip().split())


def normalize_skill(skill: str) -> str:
    normalized = normalize_text(skill)
    return SYNONYMS.get(normalized, normalized)


def unique_normalized_skills(skills: list[str]) -> list[str]:
    normalized_skills: list[str] = []
    seen: set[str] = set()

    for skill in skills:
        normalized = normalize_skill(skill)
        if normalized not in seen:
            seen.add(normalized)
            normalized_skills.append(normalized)

    return normalized_skills