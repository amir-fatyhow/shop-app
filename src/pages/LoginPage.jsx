import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (user) {
    return (
      <div className="max-w-md mx-auto px-4 sm:px-6 py-16 text-center" data-testid="already-logged-in">
        <div className="text-5xl mb-4">👋</div>
        <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
          Вы уже вошли как {user.name}
        </h1>
        <button
          onClick={() => navigate('/')}
          className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white px-6 py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-violet-700 shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
        >
          На главную
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email.trim(), password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setError('');
    navigate('/');
  };

  const inputClass =
    'w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 ring-1 ring-slate-200 dark:ring-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all';

  const labelClass = 'block mb-1.5 text-sm font-medium text-slate-700 dark:text-slate-300';

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-10 sm:py-16" data-testid="login-page">
      <div className="rounded-3xl bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 p-6 sm:p-8 shadow-sm">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-1 text-slate-900 dark:text-white">
          Вход
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          Войдите, чтобы продолжить покупки
        </p>

        <form onSubmit={handleSubmit} className="space-y-4" data-testid="login-form">
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              data-testid="login-email"
            />
          </div>

          <div>
            <label className={labelClass}>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              data-testid="login-password"
            />
          </div>

          {error && (
            <div className="px-4 py-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-medium" data-testid="login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-violet-700 shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
            data-testid="login-submit"
          >
            Войти
          </button>
        </form>

        <p className="text-xs text-slate-400 dark:text-slate-500 mt-4 text-center" data-testid="login-hint">
          Для входа подойдёт любой email и пароль от 6 символов.
        </p>
      </div>
    </div>
  );
}