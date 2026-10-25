export default function SearchBar({ value, onChange, placeholder = 'Search posts by title or content…' }) {
  return (
    <div className="search-bar" role="search">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search posts"
      />
    </div>
  )
}
