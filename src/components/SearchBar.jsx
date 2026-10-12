export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Поиск товаров..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full max-w-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      data-testid="search-input"
    />
  );
}