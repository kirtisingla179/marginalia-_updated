import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

// Scrolls to #hash targets (e.g. /#faq) or back to the top on page change.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function Layout({ variant = 'public' }) {
  return (
    <>
      <ScrollManager />
      <Navbar variant={variant} />
      <Outlet />
      <Footer />
    </>
  )
}
