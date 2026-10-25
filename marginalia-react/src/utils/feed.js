import { getAuthorById } from '../services/authService'

// Can `viewerId` see this post? (owner always can; otherwise it must be a
// published post whose audience and the author's account privacy allow it.)
export function canViewPost(post, viewerId, friendIds) {
  if (post.authorId === viewerId) return true
  if (post.status !== 'published') return false
  const isFriend = friendIds.includes(post.authorId)
  const author = getAuthorById(post.authorId)
  if (author.isPrivate && !isFriend) return false
  if (post.audience === 'public') return true
  if (post.audience === 'friends') return isFriend
  return false // 'onlyme'
}

// Newest user-written posts first, then the seed posts in their original order.
export function sortFeed(posts) {
  return [...posts].sort((a, b) => {
    if (a.source === 'user' && b.source !== 'user') return -1
    if (b.source === 'user' && a.source !== 'user') return 1
    if (a.source === 'user') return b.createdAt - a.createdAt
    return a.order - b.order
  })
}

export function matchesQuery(post, query) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return post.title.toLowerCase().includes(q) || post.content.toLowerCase().includes(q)
}

// Feed for public pages: everything the viewer may see, own posts included.
export const feedFor = (posts, viewerId, friendIds) =>
  sortFeed(posts.filter((p) => canViewPost(p, viewerId, friendIds)))

// Homepage: newest user-written posts, then seed posts in their pinned order.
export function homeFeed(posts, viewerId, friendIds, limit = 4) {
  const visible = posts.filter((p) => canViewPost(p, viewerId, friendIds))
  const mine = visible.filter((p) => p.source === 'user').sort((a, b) => b.createdAt - a.createdAt)
  const pinned = visible
    .filter((p) => p.source === 'seed' && p.homeRank !== undefined)
    .sort((a, b) => a.homeRank - b.homeRank)
  return [...mine, ...pinned].slice(0, limit)
}
