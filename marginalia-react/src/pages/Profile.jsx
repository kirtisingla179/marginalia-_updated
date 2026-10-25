import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import usePosts from '../hooks/usePosts'
import useFriends from '../hooks/useFriends'
import { getAuthorById } from '../services/authService'
import { feedFor } from '../utils/feed'
import PostGrid from '../components/PostGrid'
import PageHeader from '../components/PageHeader'

export default function Profile() {
  const { authorId } = useParams()
  const { user } = useAuth()
  const { posts } = usePosts()
  const { friendIds, toggleFriend, isFriend, isRequested, sendRequest, cancelRequest, simulateAccept } = useFriends()
  const author = getAuthorById(authorId)

  if (!author || author.name === 'Unknown writer') {
    return (
      <main>
        <PageHeader eyebrow="Profile" title="Writer not found">We couldn't find that profile.</PageHeader>
        <section className="category-page">
          <div className="wrap stories__more"><Link to="/dashboard" className="btn">Back to dashboard</Link></div>
        </section>
      </main>
    )
  }

  const isMe = author.id === user.id
  const friend = isFriend(author.id)
  const requested = isRequested(author.id)
  const locked = author.isPrivate && !friend && !isMe
  const authorPosts = feedFor(posts, user.id, friendIds).filter((p) => p.authorId === author.id)
  const reads = author.reads ?? authorPosts.reduce((s, p) => s + (p.reads || 0), 0)
  const first = author.name.split(' ')[0]

  return (
    <main>
      <section className="category-page">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div className="profile-header">
            <span className="profile-avatar" style={author.isPrivate ? { background: 'var(--maroon-900)' } : undefined}>
              {author.name[0]}
            </span>
            <div>
              <h1 className="profile-name">{author.name}{author.isPrivate && ' \u{1F512}'}</h1>
              <p className="profile-role">{author.role}{author.isPrivate && ' · Private account'}</p>
              {(author.bio || isMe) && (
                <p className="profile-bio">{author.bio ?? 'This is your own profile.'}</p>
              )}
              <div className="profile-stats">
                <div>{locked ? <strong className="stat-card--locked">&#128274;</strong> : <strong>{authorPosts.length}</strong>}<span>Posts</span></div>
                {author.followers !== undefined && <div><strong>{author.followers.toLocaleString()}</strong><span>Followers</span></div>}
                <div>{locked ? <strong className="stat-card--locked">&#128274;</strong> : <strong>{reads.toLocaleString()}</strong>}<span>Total Reads</span></div>
              </div>

              {!isMe && (
                <>
                  {author.isPrivate && !friend ? (
                    requested ? (
                      <>
                        <button type="button" className="btn btn--ghost btn--small" style={{ marginTop: 6 }}
                          onClick={() => cancelRequest(author.id)}>
                          Request sent — cancel
                        </button>{' '}
                        <button type="button" className="btn btn--small" style={{ marginTop: 6 }}
                          onClick={() => simulateAccept(author.id)}>
                          Demo: simulate {first} accepting
                        </button>
                      </>
                    ) : (
                      <button type="button" className="btn btn--small" style={{ marginTop: 6 }}
                        onClick={() => sendRequest(author.id)}>
                        + Send Friend Request
                      </button>
                    )
                  ) : (
                    <button type="button" className="btn btn--small" style={{ marginTop: 6 }}
                      onClick={() => toggleFriend(author.id)}>
                      {friend ? '\u2713 Friends — remove' : '+ Add as Friend'}
                    </button>
                  )}
                  <p className="editor__hint" style={{ marginTop: 10, maxWidth: '44ch' }}>
                    {author.isPrivate
                      ? requested
                        ? `Your request is waiting for ${first} to accept. Nothing unlocks until then. (There is no server, so the demo button above stands in for ${first} accepting.)`
                        : friend
                          ? `You're friends with ${first}, so their posts are unlocked.`
                          : `Because ${first}'s whole account is private, nothing unlocks until ${first} accepts your friend request — not just individual posts, but the profile itself.`
                      : `Everyone can already see ${first}'s public posts below — no need to add ${first === 'Priya' ? 'her' : 'them'} for those. Adding as a friend just unlocks anything marked "Friends only."`}
                  </p>
                </>
              )}
            </div>
          </div>

          {locked ? (
            <>
              <div className="private-banner">
                <span className="private-banner__icon">&#128274;</span>
                <h3>This account is private</h3>
                <p>Follower count is visible, but {first}'s posts, reading stats, and full bio stay hidden until you're friends.</p>
              </div>
              <div className="section-head" style={{ marginBottom: 24 }}>
                <p className="eyebrow">Hidden</p>
                <h2>{first}'s posts</h2>
              </div>
              <div className="stories__grid">
                {[0, 1, 2].map((i) => (
                  <div className="locked-card" key={i}>
                    <span className="locked-card__icon">&#128274;</span>
                    <span className="locked-card__bar"></span>
                    <span className="locked-card__bar locked-card__bar--short"></span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="section-head" style={{ marginBottom: 24 }}>
                <p className="eyebrow">Published</p>
                <h2>{isMe ? 'Your posts' : `${first}'s posts`}</h2>
              </div>
              <PostGrid posts={authorPosts} featureFirst
                emptyTitle="No posts to show" emptyText={`${first} hasn't published anything you can see yet.`} />
            </>
          )}
        </div>
      </section>
    </main>
  )
}
