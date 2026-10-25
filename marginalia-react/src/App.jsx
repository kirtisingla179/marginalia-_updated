import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Preloader from './components/Preloader'
import Home from './pages/Home'
import Explore from './pages/Explore'
import CategoryPage from './pages/CategoryPage'
import About from './pages/About'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import WritePost from './pages/WritePost'
import EditPost from './pages/EditPost'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Preloader />
        <Routes>
          {/* public pages: marketing navbar */}
          <Route element={<Layout variant="public" />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/:categorySlug" element={<CategoryPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* signed-in pages: app navbar, guarded by ProtectedRoute */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout variant="app" />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/write" element={<WritePost />} />
              <Route path="/edit/:id" element={<EditPost />} />
              <Route path="/profile/:authorId" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
