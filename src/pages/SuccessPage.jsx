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
    <div className="max-w-2xl mx-auto p-4 sm:p-6 text-center" data-testid="success-page">
      <div className="text-6xl mb-4">✅</div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Заказ оформлен!
      </h1>
      <p
        className="text-gray-600 dark:text-gray-400 mb-6"
        data-testid="success-message"
      >
        Спасибо за покупку. Мы свяжемся с вами для подтверждения.
      </p>

      {order && (
        <div
          className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-left mb-6 bg-white dark:bg-gray-800 shadow-sm"
          data-testid="order-details"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Номер заказа: <span data-testid="order-id">{order.id}</span>
          </p>
          <p
            className="font-medium mb-1 text-gray-900 dark:text-gray-100"
            data-testid="order-customer"
          >
            {order.customer.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {order.customer.email}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {order.customer.address}
          </p>
          <p
            className="text-lg font-bold text-gray-900 dark:text-gray-100"
            data-testid="order-total"
          >
            {formatPrice(order.total)}
          </p>
        </div>
      )}

      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 dark:hover:bg-blue-600 active:scale-95 transition-all inline-block"
        data-testid="back-to-catalog"
      >
        Вернуться в каталог
      </Link>
    </div>
  );
}