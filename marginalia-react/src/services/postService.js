// Posts are kept in localStorage. On first run they are seeded from data/seed.js.
import { SEED_POSTS } from '../data/seed'
import { getCategoryByLabel, CATEGORIES } from '../data/categories'

const KEY = 'marginalia_posts_v1'

function read() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* fall through to seed */ }
  localStorage.setItem(KEY, JSON.stringify(SEED_POSTS))
  return SEED_POSTS.slice()
}

const write = (posts) => localStorage.setItem(KEY, JSON.stringify(posts))

export const getAllPosts = () => read()
export const getPostById = (id) => read().find((p) => p.id === id)

const formatDate = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

export function addPost({ title, content, category, image, audience, status, authorId }) {
  const now = new Date()
  const cleaned = content.trim()
  const newPost = {
    id: `p_${now.getTime().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    authorId,
    title: title.trim(),
    content: cleaned,
    excerpt: cleaned.length > 140 ? `${cleaned.slice(0, 140).trim()}…` : cleaned,
    category,
    image: image?.trim() || getCategoryByLabel(category)?.defaultImage || CATEGORIES[0].defaultImage,
    audience,
    status,
    dateLabel: status === 'draft' ? 'Draft saved just now' : formatDate(now),
    createdAt: now.getTime(),
    reads: 0,
    source: 'user',
  }
  write([newPost, ...read()])
  return newPost
}

export function updatePost(id, changes) {
  const posts = read().map((p) => {
    if (p.id !== id) return p
    const content = (changes.content ?? p.content).trim()
    return {
      ...p,
      ...changes,
      title: (changes.title ?? p.title).trim(),
      content,
      excerpt: content.length > 140 ? `${content.slice(0, 140).trim()}…` : content,
      image:
        changes.image?.trim() ||
        (changes.category ? getCategoryByLabel(changes.category)?.defaultImage : null) ||
        p.image,
      dateLabel:
        (changes.status ?? p.status) === 'draft' ? 'Draft saved just now' : p.status === 'draft' ? formatDate(new Date()) : p.dateLabel,
    }
  })
  write(posts)
  return posts.find((p) => p.id === id)
}

export function deletePost(id) {
  write(read().filter((p) => p.id !== id))
}
