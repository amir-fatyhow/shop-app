const categories = ['Все', 'Электроника', 'Книги', 'Одежда'];

export default function CategoryFilter({ value, onChange }) {
  return (
    <div className="flex gap-2" data-testid="category-filter">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-3 py-1 rounded border ${
            value === cat
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300'
          }`}
          data-testid={`category-${cat}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}