import { useEffect } from 'react'
import { site } from '../data/site'
import Button from '../components/ui/Button'
import SectionHeader from '../components/ui/SectionHeader'
import { revealOnScroll, killScrollTriggers } from '../animations/gsap.config'
import { useReducedMotion } from '../hooks/useReducedMotion'
import './About.css'

export default function About() {
  const { about } = site
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    revealOnScroll('.about-reveal', { stagger: 0.08 })
    revealOnScroll('.about-card', { stagger: 0.08 })
    revealOnScroll('.about-activity-card', { stagger: 0.06 })
    return () => killScrollTriggers()
  }, [prefersReducedMotion])

  const ACTIVITIES = [
    {
      title: 'Interactive Workshops',
      desc: 'Hands-on coding bootcamps on systems, web development, and AI tools.',
      icon: (
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: 'Tech Quizzes',
      desc: 'High-energy quizzes exploring core computer science, trivia, and modern tools.',
      icon: (
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Coding Challenges',
      desc: 'Problem-solving sprints focused on algorithm mastery and clean engineering.',
      icon: (
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      title: 'Hackathons',
      desc: 'Flagship 24-hour hackathons uniting 1,000+ developers to build solutions for real impact.',
      icon: (
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'Expert Sessions',
      desc: 'Keynotes, industry AMAs, and tech talks led by top engineers and alumni.',
      icon: (
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
        </svg>
      )
    },
    {
      title: 'Hands-on Projects',
      desc: 'Production-grade software collaborations with real university users and open source impact.',
      icon: (
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    }
  ]

  const TECH_TAGS = [
    'Programming in C & C++',
    'Agentic AI',
    'GitHub & Version Control',
    'Modern Dev Tools',
    'Systems Engineering',
    'Open Source'
  ]

  const CAREER_SKILLS = [
    'Communication',
    'Problem-Solving',
    'Teamwork',
    'Leadership',
    'Interview Preparation',
    'Resume Building',
    'Professional Etiquette',
    'Personality Development'
  ]

  return (
    <main id="main-content" className="page about-page">
      <div className="container">
        {/* Page Header */}
        <header className="about-page__header">
          <SectionHeader
            eyebrow={about.title}
            title={about.tagline}
            subtitle={about.intro}
          />
        </header>

        {/* Dual Focus Pillars */}
        <section className="about-section" aria-label="Our dual approach">
          <div className="about-focus-grid">
            {/* Technical Pillar */}
            <div className="about-card about-reveal">
              <div className="about-card__header">
                <span className="about-card__badge">01 · Technical Depth</span>
                <h3 className="about-card__title">Programming Fundamentals to Emerging Tech</h3>
              </div>
              <p className="about-card__body">
                {about.technical}
              </p>
              <div className="about-card__tags">
                {TECH_TAGS.map((tag, idx) => (
                  <span key={idx} className="about-tag">{tag}</span>
                ))}
              </div>
            </div>

            {/* Beyond Academics Pillar */}
            <div className="about-card about-reveal">
              <div className="about-card__header">
                <span className="about-card__badge about-card__badge--maroon">02 · Beyond Academics</span>
                <h3 className="about-card__title">Professional Skills & Career Readiness</h3>
              </div>
              <p className="about-card__body">
                {about.beyondAcademics}
              </p>
              <div className="about-card__tags">
                {CAREER_SKILLS.map((skill, idx) => (
                  <span key={idx} className="about-tag about-tag--soft">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experiential Learning (What We Do) */}
        <section className="about-section" aria-label="Learning by doing">
          <SectionHeader
            eyebrow="Experiential Learning"
            title="Learn by doing. Collaborate to solve."
            subtitle={about.learningByDoing}
            align="left"
          />

          <div className="about-activities-grid">
            {ACTIVITIES.map((act, i) => (
              <div key={i} className="about-activity-card about-reveal">
                <div className="about-activity__icon-wrap">
                  {act.icon}
                </div>
                <h4 className="about-activity__title">{act.title}</h4>
                <p className="about-activity__desc">{act.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Philosophy & Ethos Callout Banner */}
        <section className="about-section" aria-label="Our philosophy">
          <div className="about-ethos-banner about-reveal">
            <div className="about-ethos__eyebrow">✦ OUR PHILOSOPHY ✦</div>
            <blockquote className="about-ethos__quote">
              "{about.ethos}"
            </blockquote>
            <div className="about-ethos__divider" />
            <p className="about-ethos__impact">
              {about.mission}
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="about-cta about-reveal" aria-label="Get involved">
          <div className="about-cta__inner">
            <div className="about-cta__glow" aria-hidden="true" />
            <h2 className="about-cta__title">Ready to shape your future?</h2>
            <p className="about-cta__desc">
              Explore upcoming events, dive into technical lectures, or connect with mentors in our student community.
            </p>
            <div className="about-cta__actions">
              <Button href="/events" variant="primary" size="lg">Explore Events</Button>
              <Button href="/team" variant="ghost" size="lg">Meet the Team</Button>
              <Button href="/doubts" variant="secondary" size="lg">Ask a Doubt</Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
