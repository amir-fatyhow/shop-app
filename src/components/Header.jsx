import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold" data-testid="logo">
        🛒 ShopApp
      </Link>
      <nav className="flex gap-4">
        <Link to="/" className="hover:underline" data-testid="nav-catalog">Каталог</Link>
        <Link to="/cart" className="hover:underline" data-testid="nav-cart">Корзина</Link>
        <Link to="/login" className="hover:underline" data-testid="nav-login">Войти</Link>
      </nav>
    </header>
  );
}