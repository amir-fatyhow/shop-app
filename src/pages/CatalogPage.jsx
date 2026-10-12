import { useState, useMemo, useEffect } from 'react';
import products from '../data/products.json';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';

export default function CatalogPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Все');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'Все' || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h1
        className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100"
        data-testid="page-title"
      >
        Каталог товаров
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter value={category} onChange={setCategory} />
      </div>

      {loading ? (
        <p
          className="text-center text-gray-500 dark:text-gray-400 py-10"
          data-testid="loading"
        >
          Загрузка товаров...
        </p>
      ) : (
        <ProductList products={filtered} />
      )}
    </div>
  );
}