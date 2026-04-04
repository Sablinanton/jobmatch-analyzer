export type Resume = {
  id: number;
  title: string;
  candidate_name: string;
  desired_position: string;
  years_of_experience: number;
  raw_text: string;
  created_at: string;
};

export type ResumeCreate = {
  title: string;
  candidate_name: string;
  desired_position: string;
  years_of_experience: number;
  raw_text: string;
};

export type Vacancy = {
  id: number;
  title: string;
  company: string;
  level: string;
  description: string;
  salary_text: string;
  created_at: string;
};

export type VacancyCreate = {
  title: string;
  company: string;
  level: string;
  description: string;
  salary_text: string;
};

export type AnalysisCompareRequest = {
  resume_id: number;
  vacancy_id: number;
};

export type AnalysisResult = {
  match_score: number;
  matched_skills: string[];
  missing_skills: string[];
  extra_skills: string[];
  summary: string;
};

export type AnalysisHistoryItem = {
  id: number;
  resume_id: number;
  vacancy_id: number;
  match_score: number;
  summary: string;
  created_at: string;
};
