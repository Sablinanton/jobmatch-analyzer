import { NavLink, Outlet } from 'react-router-dom';

const navigationItems = [
  { to: '/resumes', label: 'Резюме' },
  { to: '/vacancies', label: 'Вакансии' },
  { to: '/compare', label: 'Сравнение' },
];

export const Layout = () => {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <span className="brand-kicker">JobMatch Analyzer</span>
          <h1 className="brand-title">Рабочая панель</h1>
          <p className="brand-subtitle">Управление резюме, вакансиями и анализом соответствия.</p>
        </div>

        <nav className="sidebar-nav" aria-label="Основная навигация">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'nav-link nav-link--active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-note">
          <span className="sidebar-note__label">API</span>
          <span className="sidebar-note__value">127.0.0.1:8000</span>
        </div>
      </aside>

      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
};
