import type { Vacancy, VacancyCreate } from '../types';
import { apiClient } from './client';

export const getVacancies = async () => {
  const response = await apiClient.get<Vacancy[]>('/vacancies/');
  return response.data;
};

export const createVacancy = async (payload: VacancyCreate) => {
  const response = await apiClient.post<Vacancy>('/vacancies/', payload);
  return response.data;
};

export const deleteVacancy = async (vacancyId: number) => {
  await apiClient.delete(`/vacancies/${vacancyId}`);
};
