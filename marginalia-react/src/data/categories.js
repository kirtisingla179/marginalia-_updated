// Category metadata: slug (used in URLs), label (stored on posts), page copy.
// Copy is taken from the original campus-life / study-tips / internships / poetry-corner pages.

const IMG = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`

export const IMAGES = {
  A: IMG('1729799959058-bda08177a84c'),
  B: IMG('1754607812143-12d421b1db11'),
  C: IMG('1527891751199-7225231a68dd'),
  D: IMG('1643148636630-0b0fb138fc74'),
  E: IMG('1676278746065-487aa8848410'),
  F: IMG('1775229106888-dca42d0c9f4f'),
}

export const CATEGORIES = [
  {
    slug: 'campus-life',
    label: 'Campus Life',
    eyebrow: 'Fresh Ink',
    subtitle: 'Nap spots, dining hall reviews, and everything that happens between classes.',
    defaultImage: IMAGES.C,
    quote: {
      text: "I wrote about the nap spots as a joke. It's now the most-read post on the whole site — turns out everyone just wants permission to nap.",
      name: 'Amara Osei',
      role: "Sociology, Class of '26",
      initial: 'A',
    },
    why: {
      eyebrow: 'Got a campus story?',
      title: 'The small stuff makes the best posts',
      cta: 'Start writing',
      cards: [
        ['✎', 'The everyday stuff', 'Dining hall gossip, nap spots, the walk between classes.'],
        ['♫', 'Traditions & events', 'Club fairs, game days, the moments that define a semester.'],
        ['✦', 'Your own ranking', 'A completely unserious, deeply opinionated list of anything.'],
      ],
    },
  },
  {
    slug: 'study-tips',
    label: 'Study Tips',
    eyebrow: 'Fresh Ink',
    subtitle: 'What actually works when the exam is tomorrow and the notes are a mess.',
    defaultImage: IMAGES.B,
    quote: {
      text: 'I posted my worst midterm grade next to the study method that fixed it. That kind of honesty is what makes this place different from a generic advice blog.',
      name: 'Devon Reyes',
      role: "Economics, Class of '27",
      initial: 'D',
    },
    why: {
      eyebrow: 'Found something that works?',
      title: "Your study method could save someone's semester",
      cta: 'Share your method',
      cards: [
        ['✎', 'What actually worked', 'The method, the setup, the exact routine you followed.'],
        ['♫', "What didn't", 'Just as useful — save someone else the wasted week.'],
        ['✦', 'Before and after', 'Grades, hours saved, or just how much calmer finals felt.'],
      ],
    },
  },
  {
    slug: 'internships',
    label: 'Internships',
    eyebrow: 'Fresh Ink',
    subtitle: "First-week panics, offer letters, and the reply-all disasters we've all survived.",
    defaultImage: IMAGES.D,
    quote: {
      text: 'I wrote about bombing my first interview because I figured someone else was googling the exact same panic at 1am. Turns out a lot of people were.',
      name: 'Jonah Klein',
      role: "Computer Science, Class of '27",
      initial: 'J',
    },
    why: {
      eyebrow: 'Got an internship story?',
      title: "Write the post you wish you'd read",
      cta: 'Start writing',
      cards: [
        ['✎', 'First offers', 'How you found it, applied, and what the interview actually felt like.'],
        ['♫', 'First weeks', 'The onboarding chaos, the tools nobody explained, the small wins.'],
        ['✦', 'Lessons learned', "What you'd tell a friend applying to the same kind of role next year."],
      ],
    },
  },
  {
    slug: 'poetry-corner',
    label: 'Poetry Corner',
    eyebrow: 'Fresh Ink',
    subtitle: 'Verse scribbled between lectures, workshopped in dorm rooms, published here.',
    defaultImage: IMAGES.F,
    quote: {
      text: "I'd never shown anyone my poetry before this. Posting it here, to people who actually read poems, changed how seriously I take my own writing.",
      name: 'Sofia Marchetti',
      role: "Comparative Literature, Class of '26",
      initial: 'S',
    },
    why: {
      eyebrow: 'Write in verse?',
      title: "This corner is quieter, and that's the point",
      cta: 'Publish a poem',
      cards: [
        ['✎', 'Any form', "Sonnets, free verse, haiku, found poems — whatever fits what you're feeling."],
        ['♫', 'Any length', 'One line or twenty. A collection or a single stanza.'],
        ['✦', 'A gentler audience', 'Readers here come looking for poetry, not skimming past it.'],
      ],
    },
  },
]

export const CATEGORY_LABELS = CATEGORIES.map((c) => c.label)

export const getCategoryBySlug = (slug) => CATEGORIES.find((c) => c.slug === slug)
export const getCategoryByLabel = (label) => CATEGORIES.find((c) => c.label === label)
export const slugForLabel = (label) => getCategoryByLabel(label)?.slug ?? 'explore'
