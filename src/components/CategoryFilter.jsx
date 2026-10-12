const categories = ['Все', 'Электроника', 'Книги', 'Одежда'];

export default function CategoryFilter({ value, onChange }) {
  return (
    <div className="flex gap-2 flex-wrap" data-testid="category-filter">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-3 py-1 rounded border transition-all duration-200 active:scale-95 ${
            value === cat
              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-blue-400'
          }`}
          data-testid={`category-${cat}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}