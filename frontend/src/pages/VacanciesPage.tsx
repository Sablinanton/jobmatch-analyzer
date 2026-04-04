import { useEffect, useState } from 'react';
import { getApiErrorMessage } from '../api/client';
import { createVacancy, deleteVacancy, getVacancies } from '../api/vacancies';
import { VacancyForm } from '../components/VacancyForm';
import { VacancyList } from '../components/VacancyList';
import type { Vacancy, VacancyCreate } from '../types';

export const VacanciesPage = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchVacancies = async (showLoader = false) => {
    if (showLoader) {
      setIsLoading(true);
    }

    try {
      const data = await getVacancies();
      setVacancies(data);
      setError(null);
    } catch (fetchError) {
      setError(getApiErrorMessage(fetchError));
    } finally {
      if (showLoader) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    void fetchVacancies(true);
  }, []);

  const handleCreate = async (values: VacancyCreate) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await createVacancy(values);
      await fetchVacancies();
    } catch (createError) {
      const message = getApiErrorMessage(createError);
      setError(message);
      throw createError;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (vacancyId: number) => {
    const shouldDelete = window.confirm('Удалить эту вакансию?');
    if (!shouldDelete) {
      return;
    }

    setDeletingId(vacancyId);
    setError(null);

    try {
      await deleteVacancy(vacancyId);
      await fetchVacancies();
    } catch (deleteError) {
      setError(getApiErrorMessage(deleteError));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <span className="page-kicker">Вакансии</span>
          <h2>Управление вакансиями</h2>
          <p>Создание, просмотр и удаление вакансий, подключенных к серверному API.</p>
        </div>
      </header>

      {error && <div className="status-message status-message--error">{error}</div>}

      <div className="page-grid page-grid--two-columns">
        <VacancyForm onSubmit={handleCreate} isSubmitting={isSubmitting} />

        {isLoading ? (
          <section className="card">
            <div className="empty-state">Загрузка вакансий...</div>
          </section>
        ) : (
          <VacancyList vacancies={vacancies} onDelete={handleDelete} deletingId={deletingId} />
        )}
      </div>
    </div>
  );
};
