// The current user's friend list (ids of authors), kept per account in localStorage.
const keyFor = (userId) => `marginalia_friends_${userId}`

export function getFriendIds(userId) {
  if (!userId) return []
  try {
    return JSON.parse(localStorage.getItem(keyFor(userId))) ?? []
  } catch {
    return []
  }
}

export function toggleFriend(userId, authorId) {
  const current = getFriendIds(userId)
  const next = current.includes(authorId)
    ? current.filter((id) => id !== authorId)
    : [...current, authorId]
  localStorage.setItem(keyFor(userId), JSON.stringify(next))
  return next
}

// ---- Friend requests (for private accounts) ----
// A request stays "pending" until the owner accepts. There is no server, so the
// owner can't really respond; the Profile page offers a clearly-labelled demo button.
const reqKey = (userId) => `marginalia_requests_${userId}`

export function getRequestIds(userId) {
  if (!userId) return []
  try {
    return JSON.parse(localStorage.getItem(reqKey(userId))) ?? []
  } catch {
    return []
  }
}

export function sendRequest(userId, authorId) {
  const next = [...new Set([...getRequestIds(userId), authorId])]
  localStorage.setItem(reqKey(userId), JSON.stringify(next))
  return next
}

export function cancelRequest(userId, authorId) {
  const next = getRequestIds(userId).filter((id) => id !== authorId)
  localStorage.setItem(reqKey(userId), JSON.stringify(next))
  return next
}

// Demo only: pretends the owner accepted -> pending request becomes a friendship.
export function acceptRequest(userId, authorId) {
  cancelRequest(userId, authorId)
  const current = getFriendIds(userId)
  if (!current.includes(authorId)) {
    localStorage.setItem(keyFor(userId), JSON.stringify([...current, authorId]))
  }
}
