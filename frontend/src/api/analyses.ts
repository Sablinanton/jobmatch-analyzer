import type { AnalysisCompareRequest, AnalysisHistoryItem, AnalysisResult } from '../types';
import { apiClient } from './client';

export const compareResumeWithVacancy = async (payload: AnalysisCompareRequest) => {
  const response = await apiClient.post<AnalysisResult>('/analyses/compare', payload);
  return response.data;
};

export const getAnalyses = async () => {
  const response = await apiClient.get<AnalysisHistoryItem[]>('/analyses/');
  return response.data;
};
