import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { totalCount } = useCart();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navLink = ({ isActive }) =>
    `px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
      isActive
        ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
        : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-20 backdrop-blur-lg bg-white/70 dark:bg-slate-950/70 border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      <Link
        to="/"
        className="flex items-center gap-2.5 text-lg font-bold text-slate-900 dark:text-white"
        data-testid="logo"
      >
        <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/30">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </span>
        <span>ShopApp</span>
      </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <NavLink to="/" className={navLink} data-testid="nav-catalog">
            Каталог
          </NavLink>

          <NavLink to="/cart" className={navLink} data-testid="nav-cart">
            <span className="flex items-center gap-1.5">
              Корзина
              {totalCount > 0 && (
                <span
                  className="min-w-[20px] h-5 px-1.5 inline-flex items-center justify-center text-[11px] font-semibold rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white"
                  data-testid="cart-count"
                >
                  {totalCount}
                </span>
              )}
            </span>
          </NavLink>

          {user ? (
            <div className="flex items-center gap-2 ml-2">
              <span
                className="hidden sm:inline text-sm text-slate-600 dark:text-slate-300"
                data-testid="user-name"
              >
                {user.name}
              </span>
              <button
                onClick={logout}
                className="px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-red-600 dark:text-slate-300 dark:hover:text-red-400"
                data-testid="logout-button"
              >
                Выйти
              </button>
            </div>
          ) : (
            <NavLink to="/login" className={navLink} data-testid="nav-login">
              Войти
            </NavLink>
          )}

          <button
            onClick={toggleTheme}
            className="ml-2 w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200"
            aria-label="Переключить тему"
            data-testid="theme-toggle"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  );
}