import { useEffect, useState } from 'react'

const KEY = 'marginalia_theme'

// The visual switch is still the CSS-only checkbox; this hook just remembers the choice.
export default function useTheme() {
  const [dark, setDark] = useState(() => localStorage.getItem(KEY) === 'dark')
  useEffect(() => {
    localStorage.setItem(KEY, dark ? 'dark' : 'light')
  }, [dark])
  return [dark, setDark]
}
