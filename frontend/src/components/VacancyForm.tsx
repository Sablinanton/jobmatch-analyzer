import { useState, type FormEvent } from 'react';
import type { VacancyCreate } from '../types';

type VacancyFormProps = {
  onSubmit: (values: VacancyCreate) => Promise<void>;
  isSubmitting: boolean;
};

const initialState: VacancyCreate = {
  title: '',
  company: '',
  level: 'junior',
  description: '',
  salary_text: '',
};

export const VacancyForm = ({ onSubmit, isSubmitting }: VacancyFormProps) => {
  const [formData, setFormData] = useState<VacancyCreate>(initialState);

  const handleChange = (field: keyof VacancyCreate, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await onSubmit({
        title: formData.title.trim(),
        company: formData.company.trim(),
        level: formData.level.trim(),
        description: formData.description.trim(),
        salary_text: formData.salary_text.trim(),
      });

      setFormData(initialState);
    } catch {
      return;
    }
  };

  return (
    <section className="card">
      <div className="section-heading">
        <h2>Новая вакансия</h2>
        <p>Создание записи через `POST /vacancies/`.</p>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <label className="field">
          <span className="field-label">Название вакансии</span>
          <input
            className="input"
            value={formData.title}
            onChange={(event) => handleChange('title', event.target.value)}
            placeholder="Python бэкенд-разработчик"
            required
          />
        </label>

        <label className="field">
          <span className="field-label">Компания</span>
          <input
            className="input"
            value={formData.company}
            onChange={(event) => handleChange('company', event.target.value)}
            placeholder="ООО Ромашка"
            required
          />
        </label>

        <label className="field">
          <span className="field-label">Уровень</span>
          <select
            className="input"
            value={formData.level}
            onChange={(event) => handleChange('level', event.target.value)}
            required
          >
            <option value="intern">Стажер</option>
            <option value="junior">Младший</option>
            <option value="middle">Средний</option>
            <option value="senior">Старший</option>
            <option value="lead">Ведущий</option>
          </select>
        </label>

        <label className="field">
          <span className="field-label">Зарплата</span>
          <input
            className="input"
            value={formData.salary_text}
            onChange={(event) => handleChange('salary_text', event.target.value)}
            placeholder="150 000 - 200 000 ₽"
            required
          />
        </label>

        <label className="field field--full">
          <span className="field-label">Описание</span>
          <textarea
            className="input textarea"
            value={formData.description}
            onChange={(event) => handleChange('description', event.target.value)}
            placeholder="Нужен бэкенд-разработчик с опытом Python, FastAPI, PostgreSQL, SQL, Git и Docker."
            rows={6}
            required
          />
        </label>

        <div className="form-actions">
          <button className="button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Сохранение...' : 'Сохранить вакансию'}
          </button>
        </div>
      </form>
    </section>
  );
};
