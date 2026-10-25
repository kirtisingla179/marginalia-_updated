import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import usePosts from '../hooks/usePosts'
import useFriends from '../hooks/useFriends'
import { getCategoryBySlug } from '../data/categories'
import { feedFor, matchesQuery } from '../utils/feed'
import PageHeader from '../components/PageHeader'
import PostGrid from '../components/PostGrid'
import SearchBar from '../components/SearchBar'
import QuoteSection from '../components/QuoteSection'
import Squiggle from '../components/Squiggle'
import NotFound from './NotFound'

export default function CategoryPage() {
  const { categorySlug } = useParams()
  const category = getCategoryBySlug(categorySlug)
  const { user } = useAuth()
  const { posts } = usePosts()
  const { friendIds } = useFriends()
  const [query, setQuery] = useState('')

  if (!category) return <NotFound />

  const shown = feedFor(posts, user?.id, friendIds).filter(
    (p) => p.category === category.label && matchesQuery(p, query))

  return (
    <main>
      <PageHeader eyebrow={category.eyebrow} title={category.label}>{category.subtitle}</PageHeader>
      <section className="category-page">
        <div className="wrap">
          <SearchBar value={query} onChange={setQuery} placeholder={`Search ${category.label}…`} />
          <PostGrid posts={shown} featureFirst={query.trim() === ''} featureLabel="Editor's Pick"
            emptyTitle="No posts here yet"
            emptyText={query ? 'Nothing matches your search.' : `Be the first to write in ${category.label}.`} />
        </div>
      </section>

      <QuoteSection quote={category.quote} />

      <section className="why">
        <div className="wrap">
          <div className="section-head section-head--center section-head--light">
            <p className="eyebrow eyebrow--light">{category.why.eyebrow}</p>
            <h2>{category.why.title}<Squiggle /></h2>
          </div>
          <div className="why__grid">
            {category.why.cards.map(([icon, title, desc]) => (
              <div className="why__card" key={title}>
                <div className="why__icon">{icon}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
          <div className="stories__more" style={{ marginTop: 36 }}>
            <Link to={user ? '/write' : '/signup'} className="btn btn--ghost"
              style={{ borderColor: 'var(--gold-400)', color: 'var(--gold-400)' }}>
              {category.why.cta} &#8594;
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
