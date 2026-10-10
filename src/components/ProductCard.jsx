import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="border rounded-lg overflow-hidden hover:shadow-lg transition block"
      data-testid={`product-card-${product.id}`}
    >
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg" data-testid={`product-name-${product.id}`}>
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm">{product.category}</p>
        <p className="text-blue-600 font-bold mt-2" data-testid={`product-price-${product.id}`}>
          {formatPrice(product.price)}
        </p>
        {!product.inStock && (
          <p className="text-red-500 text-sm mt-1" data-testid={`out-of-stock-${product.id}`}>
            Нет в наличии
          </p>
        )}
      </div>
    </Link>
  );
}