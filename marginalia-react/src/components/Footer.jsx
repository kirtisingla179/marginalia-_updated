import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { CATEGORIES } from '../data/categories'

export default function Footer() {
  const { user } = useAuth()

  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div className="footer__brand">
          <Link to="/" className="logo logo--footer">
            <span className="logo__mark">M</span>
            <span className="logo__text">Marginalia</span>
          </Link>
          <p>A blog platform for the notes you scribble between classes.</p>
        </div>
        <div className="footer__col">
          <h4>Explore</h4>
          {CATEGORIES.map((c) => (
            <Link key={c.slug} to={`/${c.slug}`}>{c.label}</Link>
          ))}
        </div>
        <div className="footer__col">
          <h4>Platform</h4>
          <Link to={user ? '/write' : '/signup'}>Start writing</Link>
          <Link to="/dashboard">My Dashboard</Link>
          <a href="#" onClick={(e) => e.preventDefault()}>Writer guidelines</a>
          <a href="#" onClick={(e) => e.preventDefault()}>For campus clubs</a>
        </div>
        <div className="footer__col">
          <h4>Company</h4>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy</Link>
        </div>
      </div>
      <div className="wrap footer__bottom">
        <p>© 2026 Marginalia. Written between lectures.</p>
        <a
          href="#top"
          className="back-to-top"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          Back to top &#8593;
        </a>
      </div>
    </footer>
  )
}
