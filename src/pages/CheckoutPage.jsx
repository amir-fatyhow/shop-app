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

    // Mock: сохраняем заказ в localStorage и переходим на success
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
        <h1 className="text-2xl font-bold mb-4">Корзина пуста</h1>
        <Link to="/" className="text-blue-600 hover:underline">
          Перейти в каталог
        </Link>
      </div>
    );
  }

  const isValid = Object.keys(validate(form)).length === 0;

  return (
    <div className="max-w-3xl mx-auto p-6" data-testid="checkout-page">
      <h1 className="text-3xl font-bold mb-6">Оформление заказа</h1>

      <form onSubmit={handleSubmit} className="space-y-4" data-testid="checkout-form">
        <div>
          <label className="block mb-1 font-medium">Имя *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            className={`w-full border rounded px-3 py-2 ${
              touched.name && errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            data-testid="checkout-name"
          />
          {touched.name && errors.name && (
            <p className="text-red-500 text-sm mt-1" data-testid="error-name">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Email *</label>
          <input
            type="text"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            className={`w-full border rounded px-3 py-2 ${
              touched.email && errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            data-testid="checkout-email"
          />
          {touched.email && errors.email && (
            <p className="text-red-500 text-sm mt-1" data-testid="error-email">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Телефон *</label>
          <input
            type="text"
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            placeholder="+79991234567"
            className={`w-full border rounded px-3 py-2 ${
              touched.phone && errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            data-testid="checkout-phone"
          />
          {touched.phone && errors.phone && (
            <p className="text-red-500 text-sm mt-1" data-testid="error-phone">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Адрес доставки *</label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => handleChange('address', e.target.value)}
            onBlur={() => handleBlur('address')}
            className={`w-full border rounded px-3 py-2 ${
              touched.address && errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            data-testid="checkout-address"
          />
          {touched.address && errors.address && (
            <p className="text-red-500 text-sm mt-1" data-testid="error-address">
              {errors.address}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Оплата</label>
          <div className="flex gap-4" data-testid="checkout-payment">
            <label className="flex items-center gap-2">
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
            <label className="flex items-center gap-2">
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

        <div className="border-t pt-4 flex justify-between items-center">
          <p className="text-xl font-bold" data-testid="checkout-total">
            Итого: {formatPrice(totalPrice)}
          </p>
          <button
            type="submit"
            disabled={!isValid}
            className={`px-6 py-3 rounded font-medium ${
              isValid
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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