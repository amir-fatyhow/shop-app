import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

export default function CartPage() {
  const { items, removeFromCart, setQuantity, clearCart, totalPrice, totalCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center" data-testid="empty-cart">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Корзина пуста
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Добавьте товары из каталога</p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 dark:hover:bg-blue-600 active:scale-95 transition-all inline-block"
          data-testid="go-to-catalog"
        >
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6" data-testid="cart-page">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Корзина
      </h1>

      <div className="space-y-4 mb-6" data-testid="cart-items">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
            data-testid={`cart-item-${item.productId}`}
          >
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3
                  className="font-semibold text-sm sm:text-base truncate text-gray-900 dark:text-gray-100"
                  data-testid={`cart-item-name-${item.productId}`}
                >
                  {item.name}
                </h3>
                <p
                  className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm"
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
                  className="w-8 h-8 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-90 transition-all text-gray-900 dark:text-gray-100"
                  data-testid={`decrease-${item.productId}`}
                >
                  −
                </button>
                <span
                  className="w-8 text-center text-gray-900 dark:text-gray-100"
                  data-testid={`quantity-${item.productId}`}
                >
                  {item.quantity}
                </span>
                <button
                  onClick={() => setQuantity(item.productId, item.quantity + 1)}
                  className="w-8 h-8 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-90 transition-all text-gray-900 dark:text-gray-100"
                  data-testid={`increase-${item.productId}`}
                >
                  +
                </button>
              </div>

              <p
                className="w-20 sm:w-24 text-right font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100"
                data-testid={`subtotal-${item.productId}`}
              >
                {formatPrice(item.price * item.quantity)}
              </p>

              <button
                onClick={() => removeFromCart(item.productId)}
                className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 px-2 transition-colors"
                data-testid={`remove-${item.productId}`}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <button
          onClick={clearCart}
          className="text-red-500 dark:text-red-400 hover:underline text-sm transition-colors"
          data-testid="clear-cart"
        >
          Очистить корзину
        </button>

        <div className="text-right w-full sm:w-auto">
          <p
            className="text-gray-500 dark:text-gray-400 text-sm"
            data-testid="total-count"
          >
            Товаров: {totalCount}
          </p>
          <p
            className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100"
            data-testid="total-price"
          >
            Итого: {formatPrice(totalPrice)}
          </p>
          <Link
            to="/checkout"
            className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 dark:hover:bg-blue-600 active:scale-95 transition-all"
            data-testid="checkout-button"
          >
            Оформить заказ
          </Link>
        </div>
      </div>
    </div>
  );
}