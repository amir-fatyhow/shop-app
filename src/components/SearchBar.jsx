export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Поиск товаров..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 rounded px-3 py-2 w-full max-w-md"
      data-testid="search-input"
    />
  );
}