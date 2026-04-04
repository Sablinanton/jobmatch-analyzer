import type { Resume } from '../types';

type ResumeListProps = {
  resumes: Resume[];
  onDelete: (resumeId: number) => Promise<void>;
  deletingId: number | null;
};

const formatDate = (value: string) => new Date(value).toLocaleString('ru-RU');

export const ResumeList = ({ resumes, onDelete, deletingId }: ResumeListProps) => {
  return (
    <section className="card">
      <div className="section-heading">
        <h2>Список резюме</h2>
        <p>Текущие записи, загруженные из `GET /resumes/`.</p>
      </div>

      {resumes.length === 0 ? (
        <div className="empty-state">Список пуст. Добавьте первое резюме через форму слева.</div>
      ) : (
        <div className="stack">
          {resumes.map((resume) => (
            <article key={resume.id} className="item-card">
              <div className="item-card__header">
                <div>
                  <h3>{resume.title}</h3>
                  <p className="item-card__meta">
                    {resume.candidate_name} / {resume.desired_position}
                  </p>
                </div>

                <button
                  className="button button--danger"
                  type="button"
                  onClick={() => void onDelete(resume.id)}
                  disabled={deletingId === resume.id}
                >
                  {deletingId === resume.id ? 'Удаление...' : 'Удалить'}
                </button>
              </div>

              <dl className="meta-grid">
                <div>
                  <dt>Опыт</dt>
                  <dd>{resume.years_of_experience} лет</dd>
                </div>
                <div>
                  <dt>Создано</dt>
                  <dd>{formatDate(resume.created_at)}</dd>
                </div>
              </dl>

              <p className="text-block">{resume.raw_text}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
