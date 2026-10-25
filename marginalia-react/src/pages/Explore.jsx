import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import usePosts from '../hooks/usePosts'
import useFriends from '../hooks/useFriends'
import { feedFor, matchesQuery } from '../utils/feed'
import PageHeader from '../components/PageHeader'
import PostGrid from '../components/PostGrid'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'

export default function Explore() {
  const { user } = useAuth()
  const { posts } = usePosts()
  const { friendIds } = useFriends()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const shown = feedFor(posts, user?.id, friendIds).filter(
    (p) => (category === 'All' || p.category === category) && matchesQuery(p, query))

  return (
    <main>
      <PageHeader eyebrow="Fresh Ink" title="Browse Marginalia">
        Every story you're allowed to read, from every corner of campus.
      </PageHeader>
      <section className="category-page">
        <div className="wrap">
          <SearchBar value={query} onChange={setQuery} />
          <CategoryFilter value={category} onChange={setCategory} />
          <PostGrid posts={shown} emptyTitle="No stories found"
            emptyText="Nothing matches your search. Try a different word or category." />
        </div>
      </section>
    </main>
  )
}
