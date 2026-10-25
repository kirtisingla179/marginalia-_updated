import PageHeader from '../components/PageHeader'

const card = { background: 'var(--surface-card, var(--white))', border: '1px solid var(--cream-dark)' }
const h3 = { color: 'var(--maroon-800)', marginBottom: 12 }
const p = { color: 'var(--ink-soft)', fontSize: '0.95rem' }

export default function About() {
  return (
    <main>
      <PageHeader eyebrow="Our story" title="About">A blog platform built by students, for students.</PageHeader>
      <section className="category-page">
        <div className="wrap" style={{ maxWidth: 760 }}>
          <div className="why__card" style={{ ...card, marginBottom: 20 }}>
            <h3 style={h3}>Why we started Marginalia</h3>
            <p style={{ ...p, marginBottom: 14 }}>Marginalia began as a class project between two roommates who were tired of writing essays that only one professor would ever read. We wanted a place where the funny voice memo you left yourself at 1am, or the recipe you perfected in a dorm kitchen, could become something other students actually find and enjoy.</p>
            <p style={p}>Today, writers on 340 campuses use Marginalia to publish essays, poetry, study guides, and everything in between — for free, forever, with no ads and no algorithm deciding what gets seen.</p>
          </div>
          <div className="why__card" style={card}>
            <h3 style={h3}>What we believe</h3>
            <p style={p}>Good writing doesn't need a huge audience to matter. It needs the right one. That's what we're building — a home for the stories that live in the margins of a real semester.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
