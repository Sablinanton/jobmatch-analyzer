import type { AnalysisHistoryItem } from '../types';

type AnalysisHistoryListProps = {
  analyses: AnalysisHistoryItem[];
  isLoading: boolean;
  resumeTitles: Record<number, string>;
  vacancyTitles: Record<number, string>;
};

const formatDate = (value: string) => new Date(value).toLocaleString('ru-RU');

export const AnalysisHistoryList = ({
  analyses,
  isLoading,
  resumeTitles,
  vacancyTitles,
}: AnalysisHistoryListProps) => {
  return (
    <section className="card">
      <div className="section-heading">
        <h2>История анализов</h2>
        <p>Ранее выполненные сравнения из `GET /analyses/`.</p>
      </div>

      {isLoading ? (
        <div className="empty-state">Загрузка истории анализов...</div>
      ) : analyses.length === 0 ? (
        <div className="empty-state">История пуста. Запустите первое сравнение, чтобы увидеть результаты.</div>
      ) : (
        <div className="stack">
          {analyses.map((analysis) => (
            <article key={analysis.id} className="history-card">
              <div className="history-card__top">
                <span className="history-card__score">{analysis.match_score}%</span>
                <span className="history-card__date">{formatDate(analysis.created_at)}</span>
              </div>
              <h3 className="history-card__title">
                {resumeTitles[analysis.resume_id] ?? `Резюме #${analysis.resume_id}`} /{' '}
                {vacancyTitles[analysis.vacancy_id] ?? `Вакансия #${analysis.vacancy_id}`}
              </h3>
              <p className="history-card__summary">{analysis.summary}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
