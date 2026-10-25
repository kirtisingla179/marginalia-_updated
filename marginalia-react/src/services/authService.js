// Demo-only authentication. Users and the session live in localStorage,
// so this is NOT secure — it just lets the UI behave like a real login.
import { DEMO_USER, SEED_AUTHORS } from '../data/seed'

const USERS_KEY = 'marginalia_users_v1'
const SESSION_KEY = 'marginalia_session_v1'

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* fall through to seed */ }
  localStorage.setItem(USERS_KEY, JSON.stringify([DEMO_USER]))
  return [DEMO_USER]
}

const writeUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users))

const publicUser = ({ password, ...rest }) => rest

export function getCurrentUser() {
  const id = localStorage.getItem(SESSION_KEY)
  if (!id) return null
  const user = readUsers().find((u) => u.id === id)
  return user ? publicUser(user) : null
}

export function login(email, password) {
  const user = readUsers().find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password,
  )
  if (!user) return { ok: false, error: 'Email or password is incorrect.' }
  localStorage.setItem(SESSION_KEY, user.id)
  return { ok: true, user: publicUser(user) }
}

export function signup({ name, email, password }) {
  const users = readUsers()
  if (users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
    return { ok: false, error: 'An account with this email already exists. Try logging in.' }
  }
  const user = {
    id: `u_${Date.now().toString(36)}`,
    name: name.trim(),
    email: email.trim(),
    password,
    role: 'Student Writer',
  }
  writeUsers([...users, user])
  localStorage.setItem(SESSION_KEY, user.id)
  return { ok: true, user: publicUser(user) }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
}

// Looks up anyone who can appear as a post author: real accounts + sample authors.
export function getAuthorById(id) {
  const account = readUsers().find((u) => u.id === id)
  if (account) return publicUser(account)
  return SEED_AUTHORS[id] ?? { id, name: 'Unknown writer', role: '' }
}

export const getProfileAuthors = () =>
  Object.values(SEED_AUTHORS).filter((a) => a.bio !== undefined)
