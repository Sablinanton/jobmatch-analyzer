import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ComparePage } from './pages/ComparePage';
import { ResumesPage } from './pages/ResumesPage';
import { VacanciesPage } from './pages/VacanciesPage';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/resumes" replace />} />
        <Route path="/resumes" element={<ResumesPage />} />
        <Route path="/vacancies" element={<VacanciesPage />} />
        <Route path="/compare" element={<ComparePage />} />
      </Route>
    </Routes>
  );
};

export default App;
