import { useEffect, useState } from 'react';
import { compareResumeWithVacancy, getAnalyses } from '../api/analyses';
import { getApiErrorMessage } from '../api/client';
import { getResumes } from '../api/resumes';
import { getVacancies } from '../api/vacancies';
import { AnalysisHistoryList } from '../components/AnalysisHistoryList';
import { AnalysisResultCard } from '../components/AnalysisResultCard';
import type { AnalysisHistoryItem, AnalysisResult, Resume, Vacancy } from '../types';

export const ComparePage = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [analyses, setAnalyses] = useState<AnalysisHistoryItem[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [selectedVacancyId, setSelectedVacancyId] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [isComparing, setIsComparing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInitialData = async () => {
    setIsLoading(true);
    setIsHistoryLoading(true);

    try {
      const [resumeData, vacancyData, analysesData] = await Promise.all([getResumes(), getVacancies(), getAnalyses()]);
      setResumes(resumeData);
      setVacancies(vacancyData);
      setAnalyses(analysesData);
      setError(null);
    } catch (fetchError) {
      setError(getApiErrorMessage(fetchError));
    } finally {
      setIsLoading(false);
      setIsHistoryLoading(false);
    }
  };

  const refreshHistory = async () => {
    setIsHistoryLoading(true);

    try {
      const data = await getAnalyses();
      setAnalyses(data);
      setError(null);
    } catch (historyError) {
      setError(getApiErrorMessage(historyError));
    } finally {
      setIsHistoryLoading(false);
    }
  };

  useEffect(() => {
    void fetchInitialData();
  }, []);

  const handleCompare = async () => {
    if (!selectedResumeId || !selectedVacancyId) {
      return;
    }

    setIsComparing(true);
    setError(null);

    try {
      const compareResult = await compareResumeWithVacancy({
        resume_id: Number(selectedResumeId),
        vacancy_id: Number(selectedVacancyId),
      });

      setResult(compareResult);
      await refreshHistory();
    } catch (compareError) {
      setError(getApiErrorMessage(compareError));
    } finally {
      setIsComparing(false);
    }
  };

  const resumeTitles = Object.fromEntries(resumes.map((resume) => [resume.id, resume.title]));
  const vacancyTitles = Object.fromEntries(vacancies.map((vacancy) => [vacancy.id, vacancy.title]));

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <span className="page-kicker">Сравнение</span>
          <h2>Сравнение резюме и вакансии</h2>
          <p>Выберите существующее резюме и вакансию, чтобы отправить запрос на анализ соответствия.</p>
        </div>
      </header>

      {error && <div className="status-message status-message--error">{error}</div>}

      <div className="compare-layout">
        <section className="card">
          <div className="section-heading">
            <h2>Запуск анализа</h2>
            <p>Списки подтягиваются из `GET /resumes/` и `GET /vacancies/`.</p>
          </div>

          {isLoading ? (
            <div className="empty-state">Загрузка резюме и вакансий...</div>
          ) : (
            <div className="stack">
              <label className="field">
                <span className="field-label">Резюме</span>
                <select
                  className="input"
                  value={selectedResumeId}
                  onChange={(event) => setSelectedResumeId(event.target.value)}
                >
                  <option value="">Выберите резюме</option>
                  {resumes.map((resume) => (
                    <option key={resume.id} value={resume.id}>
                      {resume.title} / {resume.candidate_name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span className="field-label">Вакансия</span>
                <select
                  className="input"
                  value={selectedVacancyId}
                  onChange={(event) => setSelectedVacancyId(event.target.value)}
                >
                  <option value="">Выберите вакансию</option>
                  {vacancies.map((vacancy) => (
                    <option key={vacancy.id} value={vacancy.id}>
                      {vacancy.title} / {vacancy.company}
                    </option>
                  ))}
                </select>
              </label>

              {resumes.length === 0 && <div className="empty-inline">Нет доступных резюме. Сначала создайте хотя бы одно.</div>}
              {vacancies.length === 0 && <div className="empty-inline">Нет доступных вакансий. Сначала создайте хотя бы одну.</div>}

              <div className="form-actions">
                <button
                  className="button"
                  type="button"
                  onClick={() => void handleCompare()}
                  disabled={!selectedResumeId || !selectedVacancyId || isComparing}
                >
                  {isComparing ? 'Анализ...' : 'Запустить анализ'}
                </button>
              </div>
            </div>
          )}
        </section>

        <AnalysisResultCard result={result} />
      </div>

      <AnalysisHistoryList
        analyses={analyses}
        isLoading={isHistoryLoading}
        resumeTitles={resumeTitles}
        vacancyTitles={vacancyTitles}
      />
    </div>
  );
};
