import type { AnalysisResult } from '../types';

type AnalysisResultCardProps = {
  result: AnalysisResult | null;
};

type SkillGroupProps = {
  title: string;
  skills: string[];
  variant: 'matched' | 'missing' | 'extra';
};

const SkillGroup = ({ title, skills, variant }: SkillGroupProps) => (
  <div className="skill-section">
    <h3>{title}</h3>
    {skills.length === 0 ? (
      <div className="empty-inline">Нет данных.</div>
    ) : (
      <div className="tag-row">
        {skills.map((skill, index) => (
          <span key={`${variant}-${skill}-${index}`} className={`tag tag--${variant}`}>
            {skill}
          </span>
        ))}
      </div>
    )}
  </div>
);

const getScoreToneClass = (score: number) => {
  if (score >= 75) {
    return 'score-badge score-badge--high';
  }

  if (score >= 45) {
    return 'score-badge score-badge--medium';
  }

  return 'score-badge score-badge--low';
};

export const AnalysisResultCard = ({ result }: AnalysisResultCardProps) => {
  return (
    <section className="card">
      <div className="section-heading">
        <h2>Результат анализа</h2>
        <p>Ответ сервиса сравнения из `POST /analyses/compare`.</p>
      </div>

      {!result ? (
        <div className="empty-state">Выберите резюме и вакансию, затем запустите анализ.</div>
      ) : (
        <div className="stack">
          <div className="result-summary">
            <span className={getScoreToneClass(result.match_score)}>Совпадение {result.match_score}%</span>
            <p className="result-summary__text">{result.summary}</p>
          </div>

          <SkillGroup title="Совпавшие навыки" skills={result.matched_skills} variant="matched" />
          <SkillGroup title="Недостающие навыки" skills={result.missing_skills} variant="missing" />
          <SkillGroup title="Дополнительные навыки" skills={result.extra_skills} variant="extra" />
        </div>
      )}
    </section>
  );
};
