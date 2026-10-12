import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';

export default function SuccessPage() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('shop-app-last-order');
      setOrder(raw ? JSON.parse(raw) : null);
    } catch {
      setOrder(null);
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16 text-center" data-testid="success-page">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white text-4xl mb-6 shadow-lg">
        ✓
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold mb-3 text-slate-900 dark:text-white">
        Заказ оформлен!
      </h1>
      <p
        className="text-slate-500 dark:text-slate-400 mb-8"
        data-testid="success-message"
      >
        Спасибо за покупку. Мы свяжемся с вами для подтверждения.
      </p>

      {order && (
        <div
          className="rounded-3xl bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 p-6 text-left mb-8 shadow-sm"
          data-testid="order-details"
        >
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
              Номер заказа
            </span>
            <span
              className="font-mono text-sm font-semibold text-slate-700 dark:text-slate-300"
              data-testid="order-id"
            >
              {order.id}
            </span>
          </div>

          <div className="space-y-2 mb-4">
            <p
              className="font-semibold text-slate-900 dark:text-white"
              data-testid="order-customer"
            >
              {order.customer.name}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {order.customer.email}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {order.customer.address}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="text-sm text-slate-500 dark:text-slate-400">Итого</span>
            <span
              className="text-lg font-extrabold text-slate-900 dark:text-white"
              data-testid="order-total"
            >
              {formatPrice(order.total)}
            </span>
          </div>
        </div>
      )}

      <Link
        to="/"
        className="inline-block bg-gradient-to-br from-indigo-500 to-violet-600 text-white px-6 py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-violet-700 shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
        data-testid="back-to-catalog"
      >
        Вернуться в каталог
      </Link>
    </div>
  );
}