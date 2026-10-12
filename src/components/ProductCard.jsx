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
      className="group border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 block"
      data-testid={`product-card-${product.id}`}
    >
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <h3
          className="font-semibold text-lg text-gray-900 dark:text-gray-100"
          data-testid={`product-name-${product.id}`}
        >
          {product.name}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{product.category}</p>
        <p
          className="text-blue-600 dark:text-blue-400 font-bold mt-2"
          data-testid={`product-price-${product.id}`}
        >
          {formatPrice(product.price)}
        </p>

        {/* Фиксированная высота — кнопка всегда на одном месте */}
        <div className="h-6 mt-1" data-testid={`stock-status-${product.id}`}>
          {!product.inStock && (
            <span
              className="text-red-500 dark:text-red-400 text-sm"
              data-testid={`out-of-stock-${product.id}`}
            >
              Нет в наличии
            </span>
          )}
        </div>

        <button
          onClick={handleAdd}
          disabled={!product.inStock}
          className={`mt-2 w-full py-2 rounded font-medium transition-all duration-200 ${
            product.inStock
              ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
          data-testid={`add-to-cart-${product.id}`}
        >
          {product.inStock ? 'В корзину' : 'Нет в наличии'}
        </button>
      </div>
    </Link>
  );
}