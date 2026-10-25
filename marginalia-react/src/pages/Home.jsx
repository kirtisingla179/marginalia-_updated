import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import usePosts from '../hooks/usePosts'
import useFriends from '../hooks/useFriends'
import { feedFor, homeFeed, matchesQuery } from '../utils/feed'
import PostGrid from '../components/PostGrid'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import Squiggle from '../components/Squiggle'
import QuoteSection from '../components/QuoteSection'

const TICKER = ['Study Abroad', 'Late-Night Study Sessions', 'Campus Life', 'Internship Diaries', 'Poetry Corner', 'Dorm Hacks', 'Thesis Chronicles', 'Club Spotlights']
const HERO_IMG = 'https://images.unsplash.com/photo-1775229106888-dca42d0c9f4f?auto=format&fit=crop&w=1000&q=80'
const SLIDES = [
  ['photo-1729799959058-bda08177a84c', 'Where every walk becomes a first draft'],
  ['photo-1754607812143-12d421b1db11', 'Lecture halls full of half-written headlines'],
  ['photo-1775229106888-dca42d0c9f4f', 'The library — still the best writers\' room'],
]
const FAQ = [
  ['Is Marginalia free for students?', 'Yes — completely free for anyone with a valid student email, forever. No hidden tiers.'],
  ['Do I need any writing experience?', 'Not at all. Half our most-read writers published their very first piece of writing here.'],
  ['Can my club or society publish here too?', 'Absolutely — clubs get a shared page where every member can contribute posts under one banner.'],
  ['Who can read my posts?', 'You choose: publish campus-only, or make it public to the entire Marginalia network.'],
]
const WHY = [
  ['✎', 'Write without the noise', 'A clean, distraction-free editor built for essays, listicles, or 3 a.m. stream-of-consciousness. Save drafts, come back at 2pm or 2am.'],
  ['♫', 'Real campus readers', 'Your posts land in front of students who actually get it — not a general internet audience, but your people, your quad, your inside jokes.'],
  ['✦', 'A portfolio that grows with you', 'Every post becomes part of your public writing portfolio — the kind that gets noticed by editors, employers, and grad programs.'],
]
const QUOTE = {
  text: "I started Marginalia to procrastinate on an essay. Two years and 40 posts later, it's the reason I know I want to be a writer.",
  name: 'Sofia Marchetti', role: "Comparative Literature, Class of '26", initial: 'S',
}

export default function Home() {
  const { user } = useAuth()
  const { posts } = usePosts()
  const { friendIds } = useFriends()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const filtering = query.trim() !== '' || category !== 'All'
  const shown = filtering
    ? feedFor(posts, user?.id, friendIds).filter(
        (p) => (category === 'All' || p.category === category) && matchesQuery(p, query))
    : homeFeed(posts, user?.id, friendIds)

  return (
    <main>
      <section className="hero">
        <div className="wrap hero__inner">
          <div className="hero__copy">
            <p className="eyebrow">Est. 2024 — 12,400+ student writers</p>
            <h1 className="hero__title">
              The best place to{' '}
              <span className="underline-wrap">chase
                <svg className="squiggle" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M2 14 C 40 4, 70 20, 110 10 C 150 0, 180 18, 220 8 C 250 1, 270 14, 298 6" />
                </svg>
              </span>{' '}
              your story.
            </h1>
            <p className="hero__sub">Marginalia is the blog platform built by students, for students — lecture-hall epiphanies, dorm-kitchen recipes, thesis spirals, and everything scribbled in the margins.</p>
            <div className="hero__ctas">
              <Link to={user ? '/write' : '/signup'} className="btn">Start your first post</Link>
              <Link to="/#stories" className="btn btn--ghost">Browse the archive &#8594;</Link>
            </div>
          </div>
          <div className="hero__visual">
            <div className="photo-card photo-card--main"
              style={{ backgroundImage: `linear-gradient(180deg, rgba(58,10,20,0.05), rgba(58,10,20,0.6)), url('${HERO_IMG}')` }}>
              <span className="badge badge--pop1"><strong>405,240</strong>Words Published</span>
              <span className="badge badge--pop2"><strong>7,400</strong>Active Writers</span>
              <span className="badge badge--pop3"><strong>29,085</strong>Stories Read Today</span>
            </div>
          </div>
        </div>
        <span className="hero__credit">Campus, golden hour</span>
      </section>

      <div className="ticker">
        <div className="ticker__track">
          {[0, 1].flatMap((n) => TICKER.flatMap((t) => [
            <span key={`${n}-${t}`}>{t}</span>,
            <span key={`${n}-${t}-s`}>&#9733;</span>,
          ]))}
        </div>
      </div>

      <section className="stats-band">
        <div className="wrap stats-band__inner">
          <div className="stat"><span className="stat__num">340</span><span className="stat__label">Campuses</span></div>
          <div className="stat"><span className="stat__num">61k</span><span className="stat__label">Posts Published</span></div>
          <div className="stat"><span className="stat__num">98%</span><span className="stat__label">Would Write Again</span></div>
          <div className="stat"><span className="stat__num">4.9<small>/5</small></span><span className="stat__label">Writer Rating</span></div>
        </div>
      </section>

      <section className="stories" id="stories">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Fresh Ink</p>
            <h2>Latest from the quad</h2>
          </div>
          <SearchBar value={query} onChange={setQuery} />
          <CategoryFilter value={category} onChange={setCategory} />
          <PostGrid posts={shown} featureFirst={!filtering}
            emptyTitle="No stories found"
            emptyText="Nothing matches your search yet. Try a different word or category." />
          <div className="stories__more">
            <Link to="/explore" className="btn btn--ghost">See every story &#8594;</Link>
          </div>
        </div>
      </section>

      <section className="why" id="why">
        <div className="wrap">
          <div className="section-head section-head--center section-head--light">
            <p className="eyebrow eyebrow--light">Why students choose us</p>
            <h2>Built in the margins of a real semester<Squiggle /></h2>
          </div>
          <div className="why__grid">
            {WHY.map(([icon, title, desc]) => (
              <div className="why__card" key={title}>
                <div className="why__icon">{icon}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery" id="gallery">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Life on Campus</p>
            <h2>A comfortable place for quality stories</h2>
          </div>
        </div>
        <div className="carousel">
          {SLIDES.map((_, i) => (
            <input key={i} type="radio" name="slide" id={`slide${i + 1}`} className="carousel__radio" defaultChecked={i === 0} />
          ))}
          <div className="carousel__track">
            {SLIDES.map(([img, caption]) => (
              <div className="carousel__slide" key={img}
                style={{ backgroundImage: `url('https://images.unsplash.com/${img}?auto=format&fit=crop&w=1400&q=80')` }}>
                <div className="wrap carousel__caption"><h3>{caption}</h3></div>
              </div>
            ))}
          </div>
          <div className="carousel__dots">
            {SLIDES.map((_, i) => (
              <label key={i} htmlFor={`slide${i + 1}`} className="carousel__dot" aria-label={`Slide ${i + 1}`}></label>
            ))}
          </div>
        </div>
      </section>

      <QuoteSection quote={QUOTE} id="voices" />

      <section className="faq" id="faq">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Good to know</p>
            <h2>Frequently asked questions</h2>
          </div>
          <div className="faq__list">
            {FAQ.map(([q, a], i) => (
              <details className="faq__item" key={q} open={i === 0 ? true : undefined}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta" id="join">
        <div className="wrap cta__inner">
          <div>
            <p className="eyebrow eyebrow--dark">Free for every student, forever</p>
            <h2>Your notebook margin is waiting.</h2>
            <p className="cta__sub">Sign in with your student email and publish your first post in under five minutes.</p>
          </div>
          <div className="cta__form">
            <input type="email" placeholder="you@university.edu" aria-label="Student email" />
            <Link to={user ? '/dashboard' : '/signup'} className="btn btn--dark">Claim your page</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
