import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-slate-900 ring-1 ring-slate-200/70 dark:ring-slate-800 hover:ring-slate-300 dark:hover:ring-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
      data-testid={`product-card-${product.id}`}
    >
      <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {!product.inStock && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-full bg-red-500/90 text-white backdrop-blur">
            Нет в наличии
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4">
        <p className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-1">
          {product.category}
        </p>

        <h3
          className="font-semibold text-base text-slate-900 dark:text-slate-100 line-clamp-2 min-h-[2.75rem]"
          data-testid={`product-name-${product.id}`}
        >
          {product.name}
        </h3>

        <p
          className="mt-2 text-lg font-bold text-slate-900 dark:text-white"
          data-testid={`product-price-${product.id}`}
        >
          {formatPrice(product.price)}
        </p>

        {/* Скрытый testid — сохраняем для тестов */}
        <span
          className="sr-only"
          data-testid={`stock-status-${product.id}`}
        />
        {!product.inStock && (
          <span
            className="sr-only"
            data-testid={`out-of-stock-${product.id}`}
          >
            Нет в наличии
          </span>
        )}

        <button
          onClick={handleAdd}
          disabled={!product.inStock}
          className={`mt-4 w-full py-2.5 rounded-xl font-medium text-sm transition-all ${
            product.inStock
              ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white hover:from-indigo-600 hover:to-violet-700 shadow-sm hover:shadow-md active:scale-[0.98]'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
          }`}
          data-testid={`add-to-cart-${product.id}`}
        >
          {product.inStock ? 'В корзину' : 'Нет в наличии'}
        </button>
      </div>
    </Link>
  );
}