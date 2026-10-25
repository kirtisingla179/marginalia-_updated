const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const isEmail = (v) => EMAIL_RE.test(v.trim())

export function validatePost({ title, content, category }) {
  const errors = {}
  if (title.trim().length < 3) errors.title = 'Give your post a title (at least 3 characters).'
  if (title.trim().length > 120) errors.title = 'Keep the title under 120 characters.'
  if (!category) errors.category = 'Pick a category.'
  if (content.trim().length < 20) errors.content = 'Write at least 20 characters before publishing.'
  return errors
}

export function validateLogin({ email, password }) {
  const errors = {}
  if (!isEmail(email)) errors.email = 'Enter a valid email address.'
  if (!password) errors.password = 'Enter your password.'
  return errors
}

export function validateSignup({ name, email, password, confirm, agree }) {
  const errors = {}
  if (name.trim().length < 2) errors.name = 'Enter your full name.'
  if (!isEmail(email)) errors.email = 'Enter a valid email address.'
  if (password.length < 6) errors.password = 'Password must be at least 6 characters.'
  if (confirm !== password) errors.confirm = 'Passwords do not match.'
  if (!agree) errors.agree = 'Please accept the Privacy Policy to continue.'
  return errors
}

export function validateContact({ name, email, subject, message }) {
  const errors = {}
  if (name.trim().length < 2) errors.name = 'Enter your name.'
  if (!isEmail(email)) errors.email = 'Enter a valid email address.'
  if (subject.trim().length < 3) errors.subject = 'Add a short subject.'
  if (message.trim().length < 10) errors.message = 'Write at least 10 characters.'
  return errors
}
