import { useState } from 'react'

const KEY = 'marginalia_preloaded'

// The ink-reveal intro. Plays once per browser session, then removes itself.
export default function Preloader() {
  const [done, setDone] = useState(() => sessionStorage.getItem(KEY) === '1')
  if (done) return null

  const finish = (e) => {
    if (e.target.id === 'preloader' && e.animationName === 'preloaderExit') {
      sessionStorage.setItem(KEY, '1')
      setDone(true)
    }
  }

  return (
    <div id="preloader" role="status" aria-live="polite" onAnimationEnd={finish}>
      <span className="preloader__mark">Marginalia</span>
      <svg className="preloader__rule" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true">
        <path d="M2 14 C 40 4, 70 20, 110 10 C 150 0, 180 18, 220 8 C 250 1, 270 14, 298 6" />
      </svg>
      <span className="preloader__caption">gathering the margins…</span>
    </div>
  )
}
