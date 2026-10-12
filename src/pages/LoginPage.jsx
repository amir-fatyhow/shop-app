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
      <div className="max-w-md mx-auto p-6 text-center" data-testid="already-logged-in">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Вы уже вошли как {user.name}
        </h1>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 dark:hover:bg-blue-600 active:scale-95 transition-all"
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
    'w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all';

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6" data-testid="login-page">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Вход
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4" data-testid="login-form">
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            data-testid="login-email"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Пароль
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            data-testid="login-password"
          />
        </div>

        {error && (
          <p className="text-red-500 dark:text-red-400 text-sm" data-testid="login-error">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 dark:hover:bg-blue-600 active:scale-95 transition-all"
          data-testid="login-submit"
        >
          Войти
        </button>
      </form>

      <p
        className="text-gray-500 dark:text-gray-400 text-sm mt-4"
        data-testid="login-hint"
      >
        Для входа подойдёт любой email и пароль от 6 символов.
      </p>
    </div>
  );
}