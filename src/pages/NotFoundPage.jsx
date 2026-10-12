import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 text-center" data-testid="not-found-page">
      <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Страница не найдена
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Возможно, вы перешли по устаревшей ссылке или ошиблись в адресе.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 dark:hover:bg-blue-600 active:scale-95 transition-all inline-block"
        data-testid="not-found-home"
      >
        На главную
      </Link>
    </div>
  );
}