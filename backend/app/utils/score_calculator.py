def calculate_match_score(
        resume_skills: list[str],
        vacancy_skills: list[str],
) -> int:
    resume_set = set(resume_skills)
    vacancy_set = set(vacancy_skills)

    if not vacancy_set:
        return 0

    matched_count = len(resume_set & vacancy_set)
    score = int((matched_count / len(vacancy_set)) * 100)
    return min(score, 100)