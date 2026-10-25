import { CATEGORY_LABELS } from '../data/categories'

export default function CategoryFilter({ value, onChange }) {
  const options = ['All', ...CATEGORY_LABELS]
  return (
    <div className="chip-row" role="group" aria-label="Filter by category">
      {options.map((label) => (
        <button
          key={label}
          type="button"
          className={`chip${value === label ? ' is-active' : ''}`}
          aria-pressed={value === label}
          onClick={() => onChange(label)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
