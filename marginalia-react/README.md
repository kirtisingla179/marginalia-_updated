# Marginalia — React version

Student blog platform, migrated from plain HTML/CSS to **React + Vite (JavaScript)**.
Uses React Router, hooks (`useState`, `useEffect`, context) and `localStorage`. No backend, no extra libraries.

## Run
```
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

**Demo login:** `demo@university.edu` / `demo123` (or create a new account on /signup).

## Folder structure
```
src/
  main.jsx, App.jsx        entry point + all routes
  index.css                the original styles.css (reused) + a few additions
  components/              Navbar, Footer, Layout, PostCard, PostGrid, SearchBar,
                           CategoryFilter, ProtectedRoute, Preloader, Field, PostForm ...
  pages/                   Home, Explore, CategoryPage, About, Contact, Privacy,
                           Login, Signup, Dashboard, WritePost, EditPost, Profile, NotFound
  context/AuthContext.jsx  who is logged in (useAuth)
  hooks/                   usePosts, useFriends, useTheme
  services/                authService, postService, friendService  (all localStorage)
  utils/                   validation.js, feed.js (visibility, search, sorting)
  data/                    categories.js, seed.js (starter content)
```

## Limitations (be honest in viva)
- Login is **demo-only**: users and passwords sit in localStorage, so it is NOT secure.
- Privacy (public / friends / only me, private accounts) is enforced in the UI logic only; with no server, anyone can read localStorage in DevTools.
- Likes/bookmarks were not added because they don't exist in the original design.
- The contact form validates but does not send anything.
