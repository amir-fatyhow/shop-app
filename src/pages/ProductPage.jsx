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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center" data-testid="product-not-found">
        <h1 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
          Товар не найден
        </h1>
        <Link
          to="/"
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
        >
          ← Вернуться в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6"
        data-testid="back-to-catalog"
      >
        ← Назад в каталог
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-800">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-cover"
            data-testid="product-image"
          />
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-2">
            {product.category}
          </p>
          <h1
            className="text-2xl sm:text-3xl font-extrabold mb-2 text-slate-900 dark:text-white"
            data-testid="product-title"
          >
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-amber-500 dark:text-amber-400">★</span>
            <span
              className="text-sm text-slate-600 dark:text-slate-300"
              data-testid="product-rating"
            >
              {product.rating}
            </span>
          </div>

          <p
            className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed"
            data-testid="product-description"
          >
            {product.description}
          </p>

          <p
            className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6"
            data-testid="product-price"
          >
            {formatPrice(product.price)}
          </p>

          {product.inStock ? (
            <button
              onClick={() => addToCart(product)}
              className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white px-6 py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-violet-700 shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
              data-testid="add-to-cart-button"
            >
              Добавить в корзину
            </button>
          ) : (
            <div>
              <p
                className="text-red-500 dark:text-red-400 font-medium mb-3"
                data-testid="out-of-stock-message"
              >
                Нет в наличии
              </p>
              <button
                disabled
                className="bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 px-6 py-3 rounded-xl font-medium cursor-not-allowed"
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