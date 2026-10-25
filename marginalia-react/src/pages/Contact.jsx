import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Field from '../components/Field'
import { validateContact } from '../utils/validation'

const EMPTY = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const set = (f) => (e) => setValues((v) => ({ ...v, [f]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const found = validateContact(values)
    setErrors(found)
    if (Object.keys(found).length === 0) {
      setSent(true)
      setValues(EMPTY)
    } else setSent(false)
  }

  return (
    <main>
      <PageHeader eyebrow="Get in touch" title="Contact">
        Questions, feedback, or a club that wants a shared page — we'd love to hear from you.
      </PageHeader>
      <section className="auth">
        <div className="wrap">
          <div className="auth__card">
            {sent && (
              <p className="form-banner form-banner--success" role="status">
                Thanks! Your message was validated. (Demo project: it isn't sent to any server.)
              </p>
            )}
            <form noValidate onSubmit={submit}>
              <Field id="name" label="Your name" type="text" placeholder="Jordan Lee" value={values.name} onChange={set('name')} error={errors.name} />
              <Field id="cemail" label="Email" type="email" placeholder="you@university.edu" value={values.email} onChange={set('email')} error={errors.email} />
              <Field id="subject" label="Subject" type="text" placeholder="What's this about?" value={values.subject} onChange={set('subject')} error={errors.subject} />
              <Field id="message" label="Message" as="textarea" rows={5} placeholder="Tell us what's on your mind..."
                value={values.message} onChange={set('message')} error={errors.message}
                style={{ width: '100%', padding: '13px 16px', borderRadius: 8, border: '2px solid var(--cream-dark)', fontFamily: 'var(--font-body)', fontSize: '0.95rem', background: 'var(--cream)', resize: 'vertical' }} />
              <button type="submit" className="btn btn--full">Send message</button>
            </form>
            <p className="auth__foot">Prefer email? Reach us directly at <a href="mailto:hello@marginalia.example">hello@marginalia.example</a></p>
          </div>
        </div>
      </section>
    </main>
  )
}
