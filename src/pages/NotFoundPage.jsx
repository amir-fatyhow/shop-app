import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center" data-testid="not-found-page">
      <h1 className="text-8xl font-extrabold bg-gradient-to-br from-indigo-500 to-violet-600 bg-clip-text text-transparent mb-4">
        404
      </h1>
      <h2 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
        Страница не найдена
      </h2>
      <p className="text-slate-500 dark:text-slate-400 mb-8">
        Возможно, вы перешли по устаревшей ссылке или ошиблись в адресе.
      </p>
      <Link
        to="/"
        className="inline-block bg-gradient-to-br from-indigo-500 to-violet-600 text-white px-6 py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-violet-700 shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
        data-testid="not-found-home"
      >
        На главную
      </Link>
    </div>
  );
}