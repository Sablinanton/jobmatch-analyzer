import type { Resume, ResumeCreate } from '../types';
import { apiClient } from './client';

export const getResumes = async () => {
  const response = await apiClient.get<Resume[]>('/resumes/');
  return response.data;
};

export const createResume = async (payload: ResumeCreate) => {
  const response = await apiClient.post<Resume>('/resumes/', payload);
  return response.data;
};

export const deleteResume = async (resumeId: number) => {
  await apiClient.delete(`/resumes/${resumeId}`);
};
