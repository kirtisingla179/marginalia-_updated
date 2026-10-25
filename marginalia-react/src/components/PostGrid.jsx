import PostCard from './PostCard'

// Renders a list of posts; the first one becomes the big feature card when `featureFirst` is set.
export default function PostGrid({ posts, featureFirst = false, featureLabel, emptyTitle, emptyText, children }) {
  if (posts.length === 0) {
    return (
      <div className="stories__grid">
        <div className="empty-state">
          <h3>{emptyTitle ?? 'Nothing here yet'}</h3>
          <p>{emptyText ?? 'No posts match what you were looking for.'}</p>
          {children}
        </div>
      </div>
    )
  }
  return (
    <div className="stories__grid">
      {posts.map((p, i) => (
        <PostCard
          key={p.id}
          post={p}
          variant={featureFirst && i === 0 ? 'feature' : 'default'}
          featureLabel={featureLabel}
        />
      ))}
    </div>
  )
}
