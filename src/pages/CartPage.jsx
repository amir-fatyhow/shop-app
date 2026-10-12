import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

export default function CartPage() {
  const { items, removeFromCart, setQuantity, clearCart, totalPrice, totalCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center" data-testid="empty-cart">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
          Корзина пуста
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6">
          Добавьте товары из каталога
        </p>
        <Link
          to="/"
          className="inline-block bg-gradient-to-br from-indigo-500 to-violet-600 text-white px-6 py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-violet-700 shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
          data-testid="go-to-catalog"
        >
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10" data-testid="cart-page">
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 text-slate-900 dark:text-white">
        Корзина
      </h1>

      <div className="space-y-3 mb-6" data-testid="cart-items">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 hover:ring-slate-300 dark:hover:ring-slate-700 shadow-sm transition-all"
            data-testid={`cart-item-${item.productId}`}
          >
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className="font-semibold text-sm sm:text-base truncate text-slate-900 dark:text-white"
                  data-testid={`cart-item-name-${item.productId}`}
                >
                  {item.name}
                </h3>
                <p
                  className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm"
                  data-testid={`cart-item-price-${item.productId}`}
                >
                  {formatPrice(item.price)}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(item.productId, item.quantity - 1)}
                  className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium active:scale-90 transition-all"
                  data-testid={`decrease-${item.productId}`}
                >
                  −
                </button>
                <span
                  className="w-9 text-center font-medium text-slate-900 dark:text-white"
                  data-testid={`quantity-${item.productId}`}
                >
                  {item.quantity}
                </span>
                <button
                  onClick={() => setQuantity(item.productId, item.quantity + 1)}
                  className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium active:scale-90 transition-all"
                  data-testid={`increase-${item.productId}`}
                >
                  +
                </button>
              </div>

              <p
                className="w-20 sm:w-24 text-right font-bold text-sm sm:text-base text-slate-900 dark:text-white"
                data-testid={`subtotal-${item.productId}`}
              >
                {formatPrice(item.price * item.quantity)}
              </p>

              <button
                onClick={() => removeFromCart(item.productId)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center justify-center transition-all"
                aria-label="Удалить"
                data-testid={`remove-${item.productId}`}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <button
            onClick={clearCart}
            className="text-sm text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors"
            data-testid="clear-cart"
          >
            Очистить корзину
          </button>

          <div className="text-right w-full sm:w-auto">
            <p
              className="text-sm text-slate-500 dark:text-slate-400 mb-1"
              data-testid="total-count"
            >
              Товаров: {totalCount}
            </p>
            <p
              className="text-2xl font-extrabold text-slate-900 dark:text-white mb-4"
              data-testid="total-price"
            >
              Итого: {formatPrice(totalPrice)}
            </p>
            <Link
              to="/checkout"
              className="inline-block bg-gradient-to-br from-indigo-500 to-violet-600 text-white px-6 py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-violet-700 shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
              data-testid="checkout-button"
            >
              Оформить заказ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}