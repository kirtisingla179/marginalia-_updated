import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PageHeader from '../components/PageHeader'
import Field from '../components/Field'
import { validateSignup } from '../utils/validation'

export default function Signup() {
  const { user, signup } = useAuth()
  const navigate = useNavigate()
  const [values, setValues] = useState({ name: '', email: '', password: '', confirm: '', agree: false })
  const [errors, setErrors] = useState({})
  const [banner, setBanner] = useState(null)
  const set = (f) => (e) => setValues((v) => ({ ...v, [f]: e.target.value }))

  if (user) return <Navigate to="/dashboard" replace />

  const submit = async (e) => {
    e.preventDefault()
    const found = validateSignup(values)
    setErrors(found)
    if (Object.keys(found).length) return

    setBanner(null)
    try {
      await signup({ name: values.name, email: values.email, password: values.password })
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setBanner({ type: 'error', text: err.message })
    }
  }

  return (
    <main>
      <PageHeader eyebrow="New here?" title="Create your Marginalia page">
        Sign up with your student email — free forever, no credit card, published in minutes.
      </PageHeader>
      <section className="auth">
        <div className="wrap">
          <div className="auth__card">
            {banner && <p className={`form-banner form-banner--${banner.type}`} role="alert">{banner.text}</p>}
            <form noValidate onSubmit={submit}>
              <Field id="fullname" label="Full name" type="text" placeholder="Jordan Lee" value={values.name} onChange={set('name')} error={errors.name} />
              <Field id="suemail" label="Student email" type="email" placeholder="you@university.edu" value={values.email} onChange={set('email')} error={errors.email} />
              <Field id="supassword" label="Password" type="password" placeholder="Create a password" value={values.password} onChange={set('password')} error={errors.password} />
              <Field id="suconfirm" label="Confirm password" type="password" placeholder="Re-enter your password" value={values.confirm} onChange={set('confirm')} error={errors.confirm} />
              <div className="auth__row">
                <label className="auth__check">
                  <input type="checkbox" style={{ width: 'auto' }} checked={values.agree}
                    onChange={(e) => setValues((v) => ({ ...v, agree: e.target.checked }))} />
                  I agree to the <Link to="/privacy" style={{ marginLeft: 4 }}>Privacy Policy</Link>
                </label>
              </div>
              {errors.agree && <p className="form-error" role="alert">{errors.agree}</p>}
              <button type="submit" className="btn btn--full" style={{ marginTop: 4 }}>Create my page</button>
            </form>
            <div className="auth__divider">or</div>
            <button type="button" className="btn btn--ghost btn--full"
              onClick={() => setBanner({ type: 'info', text: 'Student SSO is not available in this demo.' })}>
              Continue with student SSO
            </button>
            <p className="auth__foot">Already have an account? <Link to="/login">Log in</Link></p>
          </div>
        </div>
      </section>
    </main>
  )
}