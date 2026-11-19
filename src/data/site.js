/**
 * SITE CONFIGURATION
 * ==================
 * Update this file to match your club's identity.
 * All pages pull from here — change once, updates everywhere.
 */

export const site = {
  // Club identity
  name: 'JYC Technical',
  fullName: 'Jaypee Youth Club — Technical Wing',
  tagline: 'Ready to make an impact',
  description:
    'A student-led technical community built around curiosity, hands-on learning, workshops, and the people who pursue engineering together.',

  // Meta / SEO
  url: 'https://jyctechnical.org',
  ogImage: '/og-image.png',

  // College affiliation
  college: 'Jaypee Institute of Information Technology',

  // Club stats (update with real numbers)
  stats: [
    { value: '200+', label: 'Active Members' },
    { value: '80+',  label: 'Lectures Hosted' },
    { value: '4',    label: 'Years Running'   },
    { value: '30+',  label: 'Projects Shipped'},
  ],

  // What the club does (3 core activities)
  activities: [
    {
      icon: '⚡',
      title: 'Weekly Lectures',
      description:
        'Expert-led sessions on cutting-edge topics — from systems programming to machine learning, delivered by practitioners.',
    },
    {
      icon: '🛠️',
      title: 'Build Projects',
      description:
        'Hands-on collaboration on real engineering challenges. Members ship production-grade software, not toy assignments.',
    },
    {
      icon: '🌐',
      title: 'Open Community',
      description:
        'A place where curious minds from any branch can explore computer science, contribute and grow together.',
    },
  ],

  // About sections
  about: {
    title: 'About JTV – JYC Technical',
    tagline: 'Where Curiosity Meets Innovation.',
    intro:
      'JTV is the technical community of JYC, bringing together curious minds, passionate learners, and aspiring innovators with a shared drive to explore technology, develop new skills, and prepare for the opportunities ahead.',
    technical:
      'We believe that learning goes beyond classrooms and career readiness goes beyond technical knowledge. From strengthening programming fundamentals in C and C++ to exploring emerging technologies such as Agentic AI, GitHub, and modern development tools, we encourage students to experiment, build, and stay curious about the ever-evolving world of technology.',
    beyondAcademics:
      'But technical expertise is only one part of the journey. We place equal importance on developing the skills that help students thrive beyond academics. Through sessions on communication, problem-solving, teamwork, leadership, interview preparation, resume building, professional etiquette, and personality development, we aim to bridge the gap between academic learning and industry expectations.',
    learningByDoing:
      'Through interactive workshops, tech quizzes, coding challenges, hackathons, expert sessions, and hands-on projects, we create opportunities for students to learn by doing, collaborate with like-minded individuals, and turn ideas into meaningful solutions.',
    ethos:
      "At JTV, it doesn't matter where your journey begins or how much you already know. What matters is the willingness to learn, the courage to explore, and the determination to grow.",
    mission:
      "We don't just help students learn technology. We help them build the skills, confidence, and mindset to shape their future.",
  },
}
