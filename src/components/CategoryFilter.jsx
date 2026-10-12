const categories = ['Все', 'Электроника', 'Книги', 'Одежда'];

export default function CategoryFilter({ value, onChange }) {
  return (
    <div
      className="flex gap-1.5 overflow-x-auto pb-1"
      data-testid="category-filter"
    >
      {categories.map((cat) => {
        const active = value === cat;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`px-3.5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              active
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 ring-1 ring-slate-200 dark:ring-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
            data-testid={`category-${cat}`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}