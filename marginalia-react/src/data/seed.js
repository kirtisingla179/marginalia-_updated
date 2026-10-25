// Starter ("seed") data. On first load this is copied into localStorage,
// after which the app reads and writes localStorage instead.

import { IMAGES } from './categories'

const { A, B, C, D, E, F } = IMAGES

export const DEMO_USER = {
  id: 'demo',
  name: 'Kirti',
  email: 'demo@university.edu',
  password: 'demo123', // demo only — stored in the browser, NOT real authentication
  role: 'Student Writer',
}

// Authors that exist only as sample content (they cannot log in).
export const SEED_AUTHORS = {
  priya: {
    id: 'priya',
    name: 'Priya Nair',
    role: "English & Journalism, Class of '26",
    bio: 'Writes about the small, specific moments of college that nobody warns you about — graduation, deadlines, and everything in between. Currently procrastinating on a thesis chapter.',
    followers: 1240,
    reads: 34600,
    isPrivate: false,
  },
  devon: {
    id: 'devon',
    name: 'Devon Reyes',
    role: "Economics, Class of '27",
    bio: 'This is a private account. Devon has chosen to hide their bio, posts, and reading stats from everyone except confirmed friends.',
    followers: 860,
    reads: 0,
    isPrivate: true,
  },
  amara: { id: 'amara', name: 'Amara Osei', role: "Sociology, Class of '26" },
  jonah: { id: 'jonah', name: 'Jonah Klein', role: "Computer Science, Class of '27" },
  leah: { id: 'leah', name: 'Leah Kim', role: 'Student Writer' },
  marco: { id: 'marco', name: 'Marco Diaz', role: 'Student Writer' },
  noor: { id: 'noor', name: 'Noor Ahmadi', role: 'Student Writer' },
  theo: { id: 'theo', name: 'Theo Brandt', role: 'Student Writer' },
  rhea: { id: 'rhea', name: 'Rhea Fontaine', role: 'Student Writer' },
  sofia: { id: 'sofia', name: 'Sofia Marchetti', role: "Comparative Literature, Class of '26" },
  chidi: { id: 'chidi', name: 'Chidi Okafor', role: 'Student Writer' },
  elena: { id: 'elena', name: 'Elena Petrova', role: 'Student Writer' },
  sam: { id: 'sam', name: 'Sam Whitfield', role: 'Student Writer' },
  kofi: { id: 'kofi', name: 'Kofi Mensah', role: 'Student Writer' },
}

// helper to keep the list below readable
const post = (id, authorId, category, title, excerpt, image, dateLabel, extra = {}) => ({
  id,
  authorId,
  category,
  title,
  excerpt,
  content: extra.content ?? excerpt,
  image,
  dateLabel,
  createdAt: new Date(`${dateLabel} 2026`).getTime() || 0,
  status: 'published',
  audience: 'public',
  reads: 0,
  source: 'seed',
  ...extra,
})

export const SEED_POSTS = [
  // ---- Campus Life ----
  post('s-nap', 'amara', 'Campus Life', 'The unofficial map of every nap spot on campus',
    'Ranked by softness, sunlight, and how likely you are to be judged by a professor.', C, 'May 9', { homeRank: 2 }),
  post('s-stage', 'priya', 'Campus Life', 'What nobody tells you about the walk across the stage',
    'Four years condensed into ninety seconds — a senior looks back at the classes, the crises, and the friends who made it worth it.',
    A, 'May 14', { homeRank: 0, tag: 'Graduation' }),
  post('s-library', 'leah', 'Campus Life', 'A love letter to the 24-hour library floor',
    'On finals week, fluorescent light, and the friends who keep you company at 2am.', E, 'May 3', { homeRank: 4 }),
  post('s-club', 'marco', 'Campus Life', 'Club fair chaos, ranked by table volume',
    'A field guide to surviving the loudest afternoon of the semester.', B, 'Apr 28'),
  post('s-dessert', 'noor', 'Campus Life', 'A very scientific ranking of every dining hall dessert',
    "Taste-tested so you don't have to risk the tray of mystery bars.", F, 'Apr 20'),
  post('s-quad', 'theo', 'Campus Life', 'How the quad becomes a different place after midnight',
    'Frisbee at 2am, silent discos, and the friends you only see in the dark.', D, 'Apr 11'),
  post('s-packed', 'priya', 'Campus Life', 'Everything I packed for freshman year that I never touched',
    'A confession, and a slightly better packing list for the next person.', E, 'Apr 2'),
  post('s-roommate', 'priya', 'Campus Life', 'A letter to my freshman-year roommate',
    'Things I never said at 2am in room 214 — shared only with the people I trust.', C, 'Mar 28',
    { audience: 'friends' }),

  // ---- Study Tips ----
  post('s-monk', 'devon', 'Study Tips', 'I tried studying like a monk for a week',
    "No phone, no music, one candle. Here's what actually happened to my grades — and my sanity.", B, 'May 11', { homeRank: 1 }),
  post('s-pomodoro', 'noor', 'Study Tips', 'The Pomodoro method ruined my life (in a good way)',
    'Twenty-five minutes at a time, until suddenly the semester made sense.', E, 'May 7'),
  post('s-notes', 'theo', 'Study Tips', "How I rebuilt my notes after losing a semester's worth",
    'A laptop crash, a panic spiral, and the backup system I use religiously now.', C, 'Apr 30'),
  post('s-flash', 'rhea', 'Study Tips', 'Flashcards vs. summaries: a completely unscientific test',
    'I studied the same chapter two ways and compared the results.', A, 'Apr 22'),
  post('s-basement', 'sofia', 'Study Tips', 'What happened when I studied only in the library basement',
    'No windows, no wifi, no excuses. A week-long experiment in isolation.', F, 'Apr 14'),
  post('s-groupchat', 'chidi', 'Study Tips', 'The group chat that replaced my entire study group',
    'How five people and a shared doc got us all through organic chemistry.', D, 'Apr 6'),
  post('s-intro', 'priya', 'Study Tips', 'How I stopped rewriting the same essay intro for three hours',
    'A very specific kind of procrastination, and the one trick that finally broke it.', B, 'Mar 20'),

  // ---- Internships ----
  post('s-firstweek', 'jonah', 'Internships', 'My first week interning felt like a foreign language',
    'Slack etiquette, standups, and the very specific panic of your first "reply-all."', D, 'May 6', { homeRank: 3 }),
  post('s-offers', 'chidi', 'Internships', 'How I landed three offers with a very average resume',
    'Cold emails, a messy portfolio, and the one line that got replies.', B, 'Apr 26'),
  post('s-asked', 'elena', 'Internships', "What I wish I'd asked before accepting my offer",
    'Salary, hours, and the questions that actually matter before you sign.', E, 'Apr 19'),
  post('s-remote', 'sam', 'Internships', 'Surviving a remote internship from a dorm room',
    "No office, no free snacks, still a full-time job. Here's how I made it work.", C, 'Apr 12'),
  post('s-unpaid', 'rhea', 'Internships', 'The unglamorous truth about unpaid internships',
    'A frank breakdown of what one actually costs — and when it might still be worth it.', A, 'Apr 5'),
  post('s-feedback', 'marco', 'Internships', 'What my manager actually meant in that feedback email',
    "Decoding corporate-speak when you're three weeks into your very first job.", F, 'Mar 29'),
  post('s-coverletter', 'priya', 'Internships', "The cover letter I almost didn't send",
    'On rejection, rewriting, and the offer that came from the application I nearly deleted.', D, 'Mar 4'),

  // ---- Poetry Corner ----
  post('s-dininghall', 'sofia', 'Poetry Corner', 'Three poems about the campus dining hall at midnight',
    'A short collection on fluorescent light, instant noodles, and the strange peace of an empty dining hall after everyone else has gone to sleep.',
    F, 'May 12'),
  post('s-haiku', 'rhea', 'Poetry Corner', 'Haiku for every stage of finals week',
    'Seven short poems, one for each increasingly unhinged day.', E, 'Apr 8'),
  post('s-villanelle', 'jonah', 'Poetry Corner', 'A villanelle about missing the last bus home',
    'On repetition, small disasters, and the walk you take instead.', C, 'Mar 30'),

  // ---- The demo user's own posts (shown on the dashboard) ----
  post('d-dining', 'demo', 'Poetry Corner', 'Three poems about the dining hall at 2 a.m.',
    'A short collection on fluorescent light, instant noodles, and the strange peace of an empty dining hall after everyone else has gone to sleep.',
    F, 'May 12',
    {
      audience: 'friends',
      reads: 2140,
      content: `A short collection on fluorescent light, instant noodles, and the strange peace of an empty dining hall after everyone else has gone to sleep.

I.
The trays stack themselves at midnight,
patient, chrome, half-dreaming
of the hands that will lift them again at seven.

II.
Nobody tells you the dining hall is quietest
exactly when you need it loudest —
one bowl, one spoon, one long fluorescent hum.`,
    }),
  post('d-busstop', 'demo', 'Poetry Corner', 'Ode to the bus stop outside the library',
    'A love poem to the fifteen minutes that started every good idea.', A, 'May 2', { reads: 1860 }),
  post('d-sonnets', 'demo', 'Poetry Corner', 'Sonnets for a group chat that never sleeps',
    'Fourteen lines each, written between problem sets.', B, 'May 1',
    { status: 'draft', audience: 'onlyme', dateLabel: 'Last edited 2 days ago' }),
  post('d-found', 'demo', 'Poetry Corner', 'A found poem made entirely from professor emails',
    'An experiment in turning bureaucracy into something almost tender.', E, 'Apr 15', { reads: 980 }),
].map((p, i) => ({ ...p, order: i }))
