import type { Vacancy } from '../types';

type VacancyListProps = {
  vacancies: Vacancy[];
  onDelete: (vacancyId: number) => Promise<void>;
  deletingId: number | null;
};

const levelLabels: Record<string, string> = {
  intern: 'Стажер',
  junior: 'Младший',
  middle: 'Средний',
  senior: 'Старший',
  lead: 'Ведущий',
};

const formatDate = (value: string) => new Date(value).toLocaleString('ru-RU');

export const VacancyList = ({ vacancies, onDelete, deletingId }: VacancyListProps) => {
  return (
    <section className="card">
      <div className="section-heading">
        <h2>Список вакансий</h2>
        <p>Текущие записи, загруженные из `GET /vacancies/`.</p>
      </div>

      {vacancies.length === 0 ? (
        <div className="empty-state">Список пуст. Добавьте первую вакансию через форму слева.</div>
      ) : (
        <div className="stack">
          {vacancies.map((vacancy) => (
            <article key={vacancy.id} className="item-card">
              <div className="item-card__header">
                <div>
                  <h3>{vacancy.title}</h3>
                  <p className="item-card__meta">
                    {vacancy.company} / {levelLabels[vacancy.level] ?? vacancy.level}
                  </p>
                </div>

                <button
                  className="button button--danger"
                  type="button"
                  onClick={() => void onDelete(vacancy.id)}
                  disabled={deletingId === vacancy.id}
                >
                  {deletingId === vacancy.id ? 'Удаление...' : 'Удалить'}
                </button>
              </div>

              <dl className="meta-grid">
                <div>
                  <dt>Зарплата</dt>
                  <dd>{vacancy.salary_text}</dd>
                </div>
                <div>
                  <dt>Создано</dt>
                  <dd>{formatDate(vacancy.created_at)}</dd>
                </div>
              </dl>

              <p className="text-block">{vacancy.description}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
