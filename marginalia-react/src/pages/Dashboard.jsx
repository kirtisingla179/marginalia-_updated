import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import usePosts from '../hooks/usePosts'
import { getProfileAuthors } from '../services/authService'
import PageHeader from '../components/PageHeader'
import PostCard from '../components/PostCard'

export default function Dashboard() {
  const { user } = useAuth()
  const { posts, deletePost } = usePosts()
  const [search, setSearch] = useState('')

  const mine = posts.filter((p) => p.authorId === user.id)
  const published = mine.filter((p) => p.status === 'published')
  const drafts = mine.filter((p) => p.status === 'draft')
  const totalReads = published.reduce((sum, p) => sum + (p.reads || 0), 0)

  const people = getProfileAuthors().filter((a) => a.name.toLowerCase().includes(search.trim().toLowerCase()))

  const handleDelete = (post) => {
    if (window.confirm(`Delete "${post.title}"? This cannot be undone.`)) deletePost(post.id)
  }

  return (
    <main>
      <PageHeader eyebrow="Your dashboard" title={`Welcome back, ${user.name}`}>
        Here's everything you've published, and everything still sitting in drafts.
      </PageHeader>
      <section className="category-page">
        <div className="wrap">
          <div className="dash-stats">
            <div className="stat-card"><span className="stat-card__num">{published.length}</span><span className="stat-card__label">Published Posts</span></div>
            <div className="stat-card"><span className="stat-card__num">{drafts.length}</span><span className="stat-card__label">Drafts</span></div>
            <div className="stat-card"><span className="stat-card__num">{totalReads.toLocaleString()}</span><span className="stat-card__label">Total Reads</span></div>
          </div>

          <div className="find-friend">
            <h2>Find a friend</h2>
            <form className="find-friend__bar" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Search by name..." value={search}
                onChange={(e) => setSearch(e.target.value)} aria-label="Search people by name" />
              <button type="submit" className="btn btn--small">Search</button>
            </form>
            {people.length === 0 && <div className="friend-row friend-row--empty">No one found with that name.</div>}
            {people.map((a) => (
              <Link key={a.id} to={`/profile/${a.id}`} className="friend-row" style={{ textDecoration: 'none' }}>
                <span className={`byline__avatar${a.isPrivate ? ' byline__avatar--gold' : ''}`}>{a.name[0]}</span>
                <div className="friend-row__info">
                  <span className="friend-row__name">{a.name}{a.isPrivate && ' \u{1F512}'}</span>
                  <span className="friend-row__meta">{a.role} · {a.isPrivate ? 'Private' : 'Public'} account</span>
                </div>
                <span className="mono" style={{ color: 'var(--maroon-700)', fontSize: '0.8rem' }}>View profile &#8594;</span>
              </Link>
            ))}
          </div>

          <div className="dash-toolbar">
            <h2 className="dash-toolbar__title">My posts</h2>
            <Link to="/write" className="btn">+ Write a new post</Link>
          </div>

          {mine.length === 0 ? (
            <div className="stories__grid">
              <div className="empty-state">
                <h3>You haven't written anything yet</h3>
                <p>Your first post is a few clicks away.</p>
                <Link to="/write" className="btn">Write your first post</Link>
              </div>
            </div>
          ) : (
            <div className="stories__grid">
              {mine.sort((a, b) => (a.source === b.source ? (b.createdAt - a.createdAt || a.order - b.order) : a.source === 'user' ? -1 : 1))
                .map((p) => <PostCard key={p.id} post={p} variant="manage" onDelete={handleDelete} />)}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
