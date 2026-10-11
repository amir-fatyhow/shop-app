import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { totalCount } = useCart();

  return (
    <header className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold" data-testid="logo">
        🛒 ShopApp
      </Link>
      <nav className="flex gap-4 items-center">
        <Link to="/" className="hover:underline" data-testid="nav-catalog">Каталог</Link>
        <Link to="/cart" className="hover:underline relative" data-testid="nav-cart">
          Корзина
          {totalCount > 0 && (
            <span
              className="ml-2 bg-blue-600 text-white text-xs rounded-full px-2 py-0.5"
              data-testid="cart-count"
            >
              {totalCount}
            </span>
          )}
        </Link>
        <Link to="/login" className="hover:underline" data-testid="nav-login">Войти</Link>
      </nav>
    </header>
  );
}