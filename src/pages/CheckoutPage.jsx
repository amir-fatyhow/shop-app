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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center" data-testid="empty-checkout">
        <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
          Корзина пуста
        </h1>
        <Link
          to="/"
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
        >
          Перейти в каталог
        </Link>
      </div>
    );
  }

  const inputClass = (hasError) =>
    `w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 ring-1 focus:outline-none focus:ring-2 transition-all ${
      hasError
        ? 'ring-red-400 dark:ring-red-500 focus:ring-red-500'
        : 'ring-slate-200 dark:ring-slate-800 focus:ring-indigo-500'
    }`;

  const labelClass = 'block mb-1.5 text-sm font-medium text-slate-700 dark:text-slate-300';

  const isValid = Object.keys(validate(form)).length === 0;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10" data-testid="checkout-page">
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 text-slate-900 dark:text-white">
        Оформление заказа
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-3xl bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 p-6 sm:p-8 shadow-sm"
        data-testid="checkout-form"
      >
        <div>
          <label className={labelClass}>Имя *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            className={inputClass(touched.name && errors.name)}
            data-testid="checkout-name"
          />
          {touched.name && errors.name && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1.5" data-testid="error-name">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className={labelClass}>Email *</label>
          <input
            type="text"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            className={inputClass(touched.email && errors.email)}
            data-testid="checkout-email"
          />
          {touched.email && errors.email && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1.5" data-testid="error-email">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className={labelClass}>Телефон *</label>
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
            <p className="text-red-500 dark:text-red-400 text-sm mt-1.5" data-testid="error-phone">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label className={labelClass}>Адрес доставки *</label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => handleChange('address', e.target.value)}
            onBlur={() => handleBlur('address')}
            className={inputClass(touched.address && errors.address)}
            data-testid="checkout-address"
          />
          {touched.address && errors.address && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1.5" data-testid="error-address">
              {errors.address}
            </p>
          )}
        </div>

        <div>
          <label className={labelClass}>Оплата</label>
          <div
            className="flex gap-3 text-slate-900 dark:text-white"
            data-testid="checkout-payment"
          >
            <label
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer transition-all ${
                form.payment === 'card'
                  ? 'bg-indigo-50 dark:bg-indigo-500/10 ring-2 ring-indigo-500'
                  : 'bg-slate-50 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700'
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="card"
                checked={form.payment === 'card'}
                onChange={(e) => handleChange('payment', e.target.value)}
                data-testid="payment-card"
                className="accent-indigo-600"
              />
              <span className="text-sm font-medium">Карта</span>
            </label>
            <label
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer transition-all ${
                form.payment === 'cash'
                  ? 'bg-indigo-50 dark:bg-indigo-500/10 ring-2 ring-indigo-500'
                  : 'bg-slate-50 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700'
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={form.payment === 'cash'}
                onChange={(e) => handleChange('payment', e.target.value)}
                data-testid="payment-cash"
                className="accent-indigo-600"
              />
              <span className="text-sm font-medium">При получении</span>
            </label>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-5 border-t border-slate-200 dark:border-slate-800">
          <p
            className="text-lg font-extrabold text-slate-900 dark:text-white"
            data-testid="checkout-total"
          >
            Итого: {formatPrice(totalPrice)}
          </p>
          <button
            type="submit"
            disabled={!isValid}
            className={`px-6 py-3 rounded-xl font-medium transition-all w-full sm:w-auto ${
              isValid
                ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white hover:from-indigo-600 hover:to-violet-700 shadow-sm hover:shadow-md active:scale-[0.98]'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
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