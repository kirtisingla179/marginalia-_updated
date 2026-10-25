import { useState } from 'react'
import Field from './Field'
import { validatePost } from '../utils/validation'

const CATEGORY_OPTIONS = ['Campus Life', 'Study Tips', 'Internships', 'Poetry Corner', 'Other']
const AUDIENCES = [
  ['public', 'Public', 'Anyone on Marginalia can find and read this post.'],
  ['friends', 'Friends only', "Only people you've added as friends can see this post — everyone else won't find it."],
  ['onlyme', 'Only me', 'Private — saved to your dashboard, visible to no one but you.'],
]

const EMPTY = { title: '', category: 'Campus Life', image: '', content: '', audience: 'public' }

// Shared by Write and Edit. onSubmit(values, status) is called only when validation passes.
export default function PostForm({ initial = EMPTY, onSubmit }) {
  const [values, setValues] = useState({ ...EMPTY, ...initial })
  const [errors, setErrors] = useState({})

  const set = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }))

  const submit = (status) => (e) => {
    e.preventDefault()
    // drafts only need a title; publishing needs the full post
    const found = status === 'published'
      ? validatePost(values)
      : values.title.trim().length < 3 ? { title: 'Give your draft a title (at least 3 characters).' } : {}
    if (values.image.trim() && !/^https?:\/\//i.test(values.image.trim())) {
      found.image = 'Cover image must be a link starting with http:// or https://'
    }
    setErrors(found)
    if (Object.keys(found).length === 0) onSubmit(values, status)
  }

  return (
    <section className="editor">
      <div className="wrap">
        <div className="editor__card">
          <form noValidate onSubmit={submit('published')}>
            <Field wrapClass="editor__field" id="ptitle" label="Title" type="text"
              placeholder="Give your post a title" value={values.title} onChange={set('title')} error={errors.title} />

            <div className="editor__field">
              <label htmlFor="pcategory">Category</label>
              <select id="pcategory" value={values.category} onChange={set('category')}>
                {CATEGORY_OPTIONS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>

            <Field wrapClass="editor__field" id="pcover" label="Cover image URL" type="url"
              placeholder="https://..." value={values.image} onChange={set('image')} error={errors.image}
              hint="Optional — a wide photo works best." />

            <Field wrapClass="editor__field" id="pcontent" label="Content" as="textarea" rows={12}
              placeholder="Start writing..." value={values.content} onChange={set('content')} error={errors.content} />

            <div className="editor__field">
              <label>Who can read this</label>
              <div className="audience-toggle">
                {AUDIENCES.map(([key, title, desc]) => (
                  <label key={key}>
                    <input type="radio" name="audience" value={key}
                      checked={values.audience === key}
                      onChange={set('audience')} />
                    <span>{title}<small>{desc}</small></span>
                  </label>
                ))}
              </div>
            </div>

            <div className="editor__actions">
              <button type="button" className="btn btn--ghost btn--full" onClick={submit('draft')}>Save as draft</button>
              <button type="submit" className="btn btn--full">Publish post</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
