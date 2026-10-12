import { useParams, Link } from 'react-router-dom';
import products from '../data/products.json';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../context/CartContext';

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center" data-testid="product-not-found">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Товар не найден
        </h1>
        <Link
          to="/"
          className="text-blue-600 dark:text-blue-400 hover:underline transition-colors"
        >
          ← Вернуться в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <Link
        to="/"
        className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block transition-colors"
        data-testid="back-to-catalog"
      >
        ← Назад в каталог
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover rounded-lg shadow-md"
          data-testid="product-image"
        />

        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100"
            data-testid="product-title"
          >
            {product.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-2">{product.category}</p>
          <p className="text-yellow-600 dark:text-yellow-400 mb-4" data-testid="product-rating">
            ★ {product.rating}
          </p>
          <p
            className="text-gray-700 dark:text-gray-300 mb-6"
            data-testid="product-description"
          >
            {product.description}
          </p>
          <p
            className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6"
            data-testid="product-price"
          >
            {formatPrice(product.price)}
          </p>

          {product.inStock ? (
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-600 text-white px-6 py-3 rounded font-medium hover:bg-blue-700 dark:hover:bg-blue-600 active:scale-95 transition-all"
              data-testid="add-to-cart-button"
            >
              Добавить в корзину
            </button>
          ) : (
            <div>
              <p
                className="text-red-500 dark:text-red-400 font-medium mb-2"
                data-testid="out-of-stock-message"
              >
                Нет в наличии
              </p>
              <button
                disabled
                className="bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-6 py-3 rounded font-medium cursor-not-allowed"
                data-testid="add-to-cart-button"
              >
                Добавить в корзину
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}