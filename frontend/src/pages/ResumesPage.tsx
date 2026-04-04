import { useEffect, useState } from 'react';
import { getApiErrorMessage } from '../api/client';
import { createResume, deleteResume, getResumes } from '../api/resumes';
import { ResumeForm } from '../components/ResumeForm';
import { ResumeList } from '../components/ResumeList';
import type { Resume, ResumeCreate } from '../types';

export const ResumesPage = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchResumes = async (showLoader = false) => {
    if (showLoader) {
      setIsLoading(true);
    }

    try {
      const data = await getResumes();
      setResumes(data);
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
    void fetchResumes(true);
  }, []);

  const handleCreate = async (values: ResumeCreate) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await createResume(values);
      await fetchResumes();
    } catch (createError) {
      const message = getApiErrorMessage(createError);
      setError(message);
      throw createError;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (resumeId: number) => {
    const shouldDelete = window.confirm('Удалить это резюме?');
    if (!shouldDelete) {
      return;
    }

    setDeletingId(resumeId);
    setError(null);

    try {
      await deleteResume(resumeId);
      await fetchResumes();
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
          <span className="page-kicker">Резюме</span>
          <h2>Управление резюме</h2>
          <p>Создание, просмотр и удаление резюме, подключенных к серверному API.</p>
        </div>
      </header>

      {error && <div className="status-message status-message--error">{error}</div>}

      <div className="page-grid page-grid--two-columns">
        <ResumeForm onSubmit={handleCreate} isSubmitting={isSubmitting} />

        {isLoading ? (
          <section className="card">
            <div className="empty-state">Загрузка резюме...</div>
          </section>
        ) : (
          <ResumeList resumes={resumes} onDelete={handleDelete} deletingId={deletingId} />
        )}
      </div>
    </div>
  );
};
