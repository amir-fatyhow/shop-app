import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

export default function CartPage() {
  const { items, removeFromCart, setQuantity, clearCart, totalPrice, totalCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center" data-testid="empty-cart">
        <h1 className="text-3xl font-bold mb-4">Корзина пуста</h1>
        <p className="text-gray-500 mb-6">Добавьте товары из каталога</p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          data-testid="go-to-catalog"
        >
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6" data-testid="cart-page">
      <h1 className="text-3xl font-bold mb-6">Корзина</h1>

      <div className="space-y-4 mb-6" data-testid="cart-items">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center gap-4 border rounded-lg p-4"
            data-testid={`cart-item-${item.productId}`}
          >
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-semibold" data-testid={`cart-item-name-${item.productId}`}>
                {item.name}
              </h3>
              <p className="text-gray-500 text-sm" data-testid={`cart-item-price-${item.productId}`}>
                {formatPrice(item.price)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(item.productId, item.quantity - 1)}
                className="w-8 h-8 border rounded hover:bg-gray-100"
                data-testid={`decrease-${item.productId}`}
              >
                −
              </button>
              <span className="w-8 text-center" data-testid={`quantity-${item.productId}`}>
                {item.quantity}
              </span>
              <button
                onClick={() => setQuantity(item.productId, item.quantity + 1)}
                className="w-8 h-8 border rounded hover:bg-gray-100"
                data-testid={`increase-${item.productId}`}
              >
                +
              </button>
            </div>

            <p className="w-24 text-right font-semibold" data-testid={`subtotal-${item.productId}`}>
              {formatPrice(item.price * item.quantity)}
            </p>

            <button
              onClick={() => removeFromCart(item.productId)}
              className="text-red-500 hover:text-red-700 px-2"
              data-testid={`remove-${item.productId}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="border-t pt-6 flex justify-between items-center">
        <button
          onClick={clearCart}
          className="text-red-500 hover:underline"
          data-testid="clear-cart"
        >
          Очистить корзину
        </button>

        <div className="text-right">
          <p className="text-gray-500" data-testid="total-count">
            Товаров: {totalCount}
          </p>
          <p className="text-2xl font-bold" data-testid="total-price">
            Итого: {formatPrice(totalPrice)}
          </p>
          <Link
            to="/checkout"
            className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            data-testid="checkout-button"
          >
            Оформить заказ
          </Link>
        </div>
      </div>
    </div>
  );
}