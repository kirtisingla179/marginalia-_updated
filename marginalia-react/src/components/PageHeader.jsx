export default function PageHeader({ eyebrow, title, children }) {
  return (
    <section className="page-header">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {children && <p>{children}</p>}
      </div>
    </section>
  )
}
