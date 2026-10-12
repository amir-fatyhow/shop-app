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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-violet-600 to-fuchsia-600 p-8 sm:p-12 mb-8 text-white shadow-lg">
        <div className="relative z-10 max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-white/70 mb-2">
            Демо-магазин
          </p>
          <h1
            className="text-3xl sm:text-5xl font-extrabold mb-3 leading-tight"
            data-testid="page-title"
          >
            Всё, что нужно — <br />в одном месте
          </h1>
          <p className="text-white/80 sm:text-lg">
            Электроника, книги и одежда. Быстрая доставка, удобный поиск, честные цены.
          </p>
        </div>
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-8 bottom-0 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold" data-testid="catalog-heading">
          Каталог
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter value={category} onChange={setCategory} />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-slate-100 dark:bg-slate-800 h-80 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <ProductList products={filtered} />
      )}
    </div>
  );
}