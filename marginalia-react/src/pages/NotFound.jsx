import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

export default function NotFound() {
  return (
    <main>
      <PageHeader eyebrow="404" title="Page not found">
        That page wandered off into the margins.
      </PageHeader>
      <section className="category-page">
        <div className="wrap">
          <div className="stories__more">
            <Link to="/" className="btn">Back to home</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
