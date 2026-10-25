import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

const card = { background: 'var(--surface-card, var(--white))', border: '1px solid var(--cream-dark)' }
const h3 = { color: 'var(--maroon-800)', marginBottom: 12 }
const p = { color: 'var(--ink-soft)', fontSize: '0.95rem' }

export default function Privacy() {
  return (
    <main>
      <PageHeader eyebrow="Good to know" title="Privacy">
        Plain-language notes on what we collect and how your posts are shared.
      </PageHeader>
      <section className="category-page">
        <div className="wrap" style={{ maxWidth: 760 }}>
          <div className="why__card" style={{ ...card, marginBottom: 20 }}>
            <h3 style={h3}>What we collect</h3>
            <p style={p}>When you create an account, we store your name, student email, and the posts you publish. We don't sell your data, and we don't run ads, so there's no tracking network feeding on your activity here.</p>
          </div>
          <div className="why__card" style={{ ...card, marginBottom: 20 }}>
            <h3 style={h3}>Who can see your posts</h3>
            <p style={p}>You choose the audience for every post: campus-only, or public to the whole Marginalia network. You can change this at any time, and you can delete a post — or your whole account — whenever you like.</p>
          </div>
          <div className="why__card" style={card}>
            <h3 style={h3}>Questions</h3>
            <p style={p}>If you have questions about your data, reach out through our <Link to="/contact" style={{ color: 'var(--maroon-700)', fontWeight: 600 }}>contact page</Link>.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
