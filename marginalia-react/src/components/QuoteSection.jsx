export default function QuoteSection({ quote, id }) {
  return (
    <section className="quote-section" id={id}>
      <div className="wrap quote-section__inner">
        <span className="quote-mark" aria-hidden="true">&#8220;</span>
        <p className="quote-text">{quote.text}</p>
        <div className="quote-attrib">
          <span className="byline__avatar byline__avatar--lg byline__avatar--gold">{quote.initial}</span>
          <div>
            <p className="quote-name">{quote.name}</p>
            <p className="mono quote-role">{quote.role}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
