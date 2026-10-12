import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/formatPrice';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    phone: '',
    payment: 'card',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (data) => {
    const e = {};
    if (!data.name.trim()) e.name = 'Введите имя';
    else if (data.name.trim().length < 2) e.name = 'Имя слишком короткое';

    if (!data.email.trim()) e.email = 'Введите email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      e.email = 'Некорректный email';

    if (!data.address.trim()) e.address = 'Введите адрес';
    else if (data.address.trim().length < 5) e.address = 'Адрес слишком короткий';

    if (!data.phone.trim()) e.phone = 'Введите телефон';
    else if (!/^\+?\d{10,15}$/.test(data.phone.replace(/[\s()-]/g, '')))
      e.phone = 'Некорректный телефон';

    return e;
  };

  const handleChange = (field, value) => {
    const next = { ...form, [field]: value };
    setForm(next);
    if (touched[field]) {
      setErrors(validate(next));
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    setErrors(validate(form));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eObj = validate(form);
    setErrors(eObj);
    setTouched({ name: true, email: true, address: true, phone: true });

    if (Object.keys(eObj).length > 0) return;

    const order = {
      id: Date.now(),
      customer: form,
      items,
      total: totalPrice,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('shop-app-last-order', JSON.stringify(order));
    clearCart();
    navigate('/success');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center" data-testid="empty-checkout">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Корзина пуста
        </h1>
        <Link
          to="/"
          className="text-blue-600 dark:text-blue-400 hover:underline transition-colors"
        >
          Перейти в каталог
        </Link>
      </div>
    );
  }

  const inputClass = (hasError) =>
    `w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
      hasError
        ? 'border-red-500 dark:border-red-400'
        : 'border-gray-300 dark:border-gray-600'
    }`;

  const isValid = Object.keys(validate(form)).length === 0;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6" data-testid="checkout-page">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Оформление заказа
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4" data-testid="checkout-form">
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Имя *
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            className={inputClass(touched.name && errors.name)}
            data-testid="checkout-name"
          />
          {touched.name && errors.name && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1" data-testid="error-name">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Email *
          </label>
          <input
            type="text"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            className={inputClass(touched.email && errors.email)}
            data-testid="checkout-email"
          />
          {touched.email && errors.email && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1" data-testid="error-email">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Телефон *
          </label>
          <input
            type="text"
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            placeholder="+79991234567"
            className={inputClass(touched.phone && errors.phone)}
            data-testid="checkout-phone"
          />
          {touched.phone && errors.phone && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1" data-testid="error-phone">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Адрес доставки *
          </label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => handleChange('address', e.target.value)}
            onBlur={() => handleBlur('address')}
            className={inputClass(touched.address && errors.address)}
            data-testid="checkout-address"
          />
          {touched.address && errors.address && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1" data-testid="error-address">
              {errors.address}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Оплата
          </label>
          <div className="flex gap-4 text-gray-900 dark:text-gray-100" data-testid="checkout-payment">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={form.payment === 'card'}
                onChange={(e) => handleChange('payment', e.target.value)}
                data-testid="payment-card"
              />
              Карта
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={form.payment === 'cash'}
                onChange={(e) => handleChange('payment', e.target.value)}
                data-testid="payment-cash"
              />
              При получении
            </label>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p
            className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100"
            data-testid="checkout-total"
          >
            Итого: {formatPrice(totalPrice)}
          </p>
          <button
            type="submit"
            disabled={!isValid}
            className={`px-6 py-3 rounded font-medium transition-all ${
              isValid
                ? 'bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-600 active:scale-95'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
            data-testid="submit-order"
          >
            Оформить заказ
          </button>
        </div>
      </form>
    </div>
  );
}