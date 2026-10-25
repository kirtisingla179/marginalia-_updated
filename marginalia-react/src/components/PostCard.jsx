import { Link } from 'react-router-dom'
import { getAuthorById } from '../services/authService'
import { slugForLabel } from '../data/categories'

const AUDIENCE_LABEL = {
  public: '\u{1F310} Public',
  friends: '\u{1F512} Friends only',
  onlyme: '\u{1F464} Only me',
}

const avatarClass = (name) => (name.length % 2 === 0 ? ' byline__avatar--gold' : '')

// variant: 'default' | 'feature' | 'manage' (dashboard: status pills + edit/delete actions)
export default function PostCard({ post, variant = 'default', featureLabel, onDelete }) {
  const author = getAuthorById(post.authorId)
  const isFeature = variant === 'feature'
  const isManage = variant === 'manage'

  const image = isFeature ? post.image.replace('w=800', 'w=1200') : post.image
  const categoryClass = isFeature
    ? 'category category--gold'
    : post.category === 'Campus Life' ? 'category category--cream' : 'category'
  const tagText = isFeature ? featureLabel ?? post.tag ?? post.category : post.category

  return (
    <article className={`card${isFeature ? ' card--feature' : ''}`}>
      <div className="card__image" style={{ backgroundImage: `url('${image}')` }}>
        <span className={categoryClass}>{tagText}</span>
      </div>
      <div className="card__body">
        {isManage && (
          <div>
            <span className={`status-pill status-pill--${post.status}`}>
              {post.status === 'published' ? 'Published' : 'Draft'}
            </span>
            <span className="status-pill status-pill--audience">{AUDIENCE_LABEL[post.audience]}</span>
          </div>
        )}
        <h3>{post.title}</h3>
        <p>
          {isManage
            ? post.status === 'published'
              ? `${post.reads.toLocaleString()} reads · Published ${post.dateLabel}`
              : post.dateLabel
            : post.excerpt}
        </p>

        {isManage ? (
          <div className="card__actions">
            <Link to={`/edit/${post.id}`} className="btn btn--ghost btn--tiny">
              {post.status === 'draft' ? 'Continue editing' : 'Edit'}
            </Link>
            {post.status === 'published' && (
              <Link to={`/${slugForLabel(post.category)}`} className="btn btn--ghost btn--tiny">View</Link>
            )}
            <button type="button" className="btn btn--danger btn--tiny" onClick={() => onDelete(post)}>
              Delete
            </button>
          </div>
        ) : (
          <div className="byline">
            <span className={`byline__avatar${avatarClass(author.name)}`}>{author.name[0]}</span>
            <Link to={author.bio !== undefined ? `/profile/${author.id}` : '#'}
              onClick={(e) => { if (author.bio === undefined) e.preventDefault() }}>
              {author.name}
            </Link>
            <span className="dot">·</span>
            <span className="mono">{post.dateLabel}</span>
          </div>
        )}
      </div>
    </article>
  )
}
