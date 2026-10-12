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
        <h1 className="text-2xl font-bold mb-4">Вы уже вошли как {user.name}</h1>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
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

  return (
    <div className="max-w-md mx-auto p-6" data-testid="login-page">
      <h1 className="text-3xl font-bold mb-6">Вход</h1>

      <form onSubmit={handleSubmit} className="space-y-4" data-testid="login-form">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            data-testid="login-email"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            data-testid="login-password"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm" data-testid="login-error">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          data-testid="login-submit"
        >
          Войти
        </button>
      </form>

      <p className="text-gray-500 text-sm mt-4" data-testid="login-hint">
        Для входа подойдёт любой email и пароль от 6 символов.
      </p>
    </div>
  );
}