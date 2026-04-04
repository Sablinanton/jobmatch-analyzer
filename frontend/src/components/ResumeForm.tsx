import { useState, type FormEvent } from 'react';
import type { ResumeCreate } from '../types';

type ResumeFormProps = {
  onSubmit: (values: ResumeCreate) => Promise<void>;
  isSubmitting: boolean;
};

type ResumeFormState = {
  title: string;
  candidate_name: string;
  desired_position: string;
  years_of_experience: string;
  raw_text: string;
};

const initialState: ResumeFormState = {
  title: '',
  candidate_name: '',
  desired_position: '',
  years_of_experience: '0',
  raw_text: '',
};

export const ResumeForm = ({ onSubmit, isSubmitting }: ResumeFormProps) => {
  const [formData, setFormData] = useState<ResumeFormState>(initialState);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (field: keyof ResumeFormState, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const years = Number(formData.years_of_experience);
    if (!Number.isFinite(years) || years < 0) {
      setValidationError('Опыт работы должен быть неотрицательным числом.');
      return;
    }

    setValidationError(null);

    try {
      await onSubmit({
        title: formData.title.trim(),
        candidate_name: formData.candidate_name.trim(),
        desired_position: formData.desired_position.trim(),
        years_of_experience: years,
        raw_text: formData.raw_text.trim(),
      });

      setFormData(initialState);
    } catch {
      return;
    }
  };

  return (
    <section className="card">
      <div className="section-heading">
        <h2>Новое резюме</h2>
        <p>Создание записи через `POST /resumes/`.</p>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <label className="field">
          <span className="field-label">Название</span>
          <input
            className="input"
            value={formData.title}
            onChange={(event) => handleChange('title', event.target.value)}
            placeholder="Резюме Python бэкенд"
            required
          />
        </label>

        <label className="field">
          <span className="field-label">Кандидат</span>
          <input
            className="input"
            value={formData.candidate_name}
            onChange={(event) => handleChange('candidate_name', event.target.value)}
            placeholder="Никита"
            required
          />
        </label>

        <label className="field">
          <span className="field-label">Желаемая должность</span>
          <input
            className="input"
            value={formData.desired_position}
            onChange={(event) => handleChange('desired_position', event.target.value)}
            placeholder="Бэкенд-разработчик"
            required
          />
        </label>

        <label className="field">
          <span className="field-label">Опыт работы, лет</span>
          <input
            className="input"
            type="number"
            min="0"
            value={formData.years_of_experience}
            onChange={(event) => handleChange('years_of_experience', event.target.value)}
            required
          />
        </label>

        <label className="field field--full">
          <span className="field-label">Текст резюме</span>
          <textarea
            className="input textarea"
            value={formData.raw_text}
            onChange={(event) => handleChange('raw_text', event.target.value)}
            placeholder="Python, FastAPI, PostgreSQL, SQL, Git, Docker, React"
            rows={6}
            required
          />
        </label>

        {validationError && <div className="status-message status-message--error">{validationError}</div>}

        <div className="form-actions">
          <button className="button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Сохранение...' : 'Сохранить резюме'}
          </button>
        </div>
      </form>
    </section>
  );
};
