import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PageHeader from '../components/PageHeader'
import Field from '../components/Field'
import { validateLogin } from '../utils/validation'

export default function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [banner, setBanner] = useState(null)
  const set = (f) => (e) => setValues((v) => ({ ...v, [f]: e.target.value }))

  if (user) return <Navigate to="/dashboard" replace />

  const submit = (e) => {
    e.preventDefault()
    const found = validateLogin(values)
    setErrors(found)
    if (Object.keys(found).length) return
    const result = login(values.email, values.password)
    if (!result.ok) return setBanner({ type: 'error', text: result.error })
    navigate(location.state?.from ?? '/dashboard', { replace: true })
  }

  return (
    <main>
      <PageHeader eyebrow="Welcome back" title="Log in to Marginalia">
        Pick up your draft, check your stats, or publish something new.
      </PageHeader>
      <section className="auth">
        <div className="wrap">
          <div className="auth__card">
            <p className="form-banner form-banner--info">
              Demo login: <strong>demo@university.edu</strong> / <strong>demo123</strong>. Accounts live only in this
              browser (localStorage) — this is a demo, not secure authentication.
            </p>
            {banner && <p className={`form-banner form-banner--${banner.type}`} role="alert">{banner.text}</p>}
            <form noValidate onSubmit={submit}>
              <Field id="email" label="Student email" type="email" placeholder="you@university.edu"
                value={values.email} onChange={set('email')} error={errors.email} />
              <Field id="password" label="Password" type="password" placeholder="••••••••"
                value={values.password} onChange={set('password')} error={errors.password} />
              <div className="auth__row">
                <label className="auth__check">
                  <input type="checkbox" style={{ width: 'auto' }} /> Remember me
                </label>
                <a href="#" onClick={(e) => e.preventDefault()}>Forgot password?</a>
              </div>
              <button type="submit" className="btn btn--full" style={{ marginTop: 4 }}>Log in</button>
            </form>
            <div className="auth__divider">or</div>
            <button type="button" className="btn btn--ghost btn--full"
              onClick={() => setBanner({ type: 'info', text: 'Student SSO is not available in this demo.' })}>
              Continue with student SSO
            </button>
            <p className="auth__foot">New to Marginalia? <Link to="/signup">Create your page</Link></p>
          </div>
        </div>
      </section>
    </main>
  )
}
