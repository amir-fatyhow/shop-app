import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { totalCount } = useCart();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-gray-900 dark:bg-gray-950 text-white py-3 px-4 sm:py-4 sm:px-6 flex justify-between items-center shadow-md sticky top-0 z-10">
      <Link
        to="/"
        className="text-lg sm:text-xl font-bold hover:text-blue-400 transition-colors"
        data-testid="logo"
      >
        🛒 ShopApp
      </Link>

      <nav className="flex gap-2 sm:gap-4 items-center text-sm sm:text-base">
        <Link
          to="/"
          className="hover:text-blue-400 transition-colors"
          data-testid="nav-catalog"
        >
          Каталог
        </Link>

        <Link
          to="/cart"
          className="hover:text-blue-400 transition-colors relative"
          data-testid="nav-cart"
        >
          Корзина
          {totalCount > 0 && (
            <span
              className="ml-1 sm:ml-2 bg-blue-600 text-white text-xs rounded-full px-2 py-0.5"
              data-testid="cart-count"
            >
              {totalCount}
            </span>
          )}
        </Link>

        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden sm:inline" data-testid="user-name">
              Привет, {user.name}
            </span>
            <button
              onClick={logout}
              className="hover:text-blue-400 transition-colors text-xs sm:text-sm text-gray-300"
              data-testid="logout-button"
            >
              Выйти
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="hover:text-blue-400 transition-colors"
            data-testid="nav-login"
          >
            Войти
          </Link>
        )}

        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-all duration-200 active:scale-90"
          aria-label="Переключить тему"
          data-testid="theme-toggle"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </nav>
    </header>
  );
}