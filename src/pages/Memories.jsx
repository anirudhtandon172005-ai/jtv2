import { useState, useEffect } from 'react'
import { memories } from '../data/memories'
import SectionHeader from '../components/ui/SectionHeader'
import Button from '../components/ui/Button'
import { revealOnScroll, killScrollTriggers } from '../animations/gsap.config'
import { useReducedMotion } from '../hooks/useReducedMotion'
import './Memories.css'

export default function Memories() {
  const [activeLightbox, setActiveLightbox] = useState(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    revealOnScroll('.memory-reveal', { stagger: 0.1 })
    return () => killScrollTriggers()
  }, [prefersReducedMotion])

  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveLightbox(null)
    }
    if (activeLightbox) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [activeLightbox])

  return (
    <main id="main-content" className="page memories-page">
      <div className="container">
        {/* Page Header */}
        <header className="memories-header memory-reveal">
          <SectionHeader
            eyebrow="CHRONICLES & MOMENTS"
            title="Memories of JTV"
            subtitle="Where passion meets community. Journey through our flagship keynotes, packed lecture halls, and defining milestones that shaped the technical collective."
          />
        </header>

        {/* Alternating Editorial Storyline */}
        <section className="memories-section" aria-label="Visual Timeline">
          <div className="memories-timeline">
            {/* Center spine guide line (desktop) */}
            <div className="memories-timeline__stem" aria-hidden="true" />

            {memories.map((item, index) => {
              const isEven = index % 2 !== 0
              return (
                <article
                  key={item.id}
                  className={`memory-row ${isEven ? 'memory-row--reverse' : ''} memory-reveal`}
                >
                  {/* Stem Marker Node */}
                  <div className="memory-node" aria-hidden="true">
                    <span className="memory-node__dot" />
                    <span className="memory-node__label">{item.chapter}</span>
                  </div>

                  {/* Visual Image Column */}
                  <div className="memory-col memory-col--media">
                    <div
                      className="memory-frame"
                      onClick={() => setActiveLightbox(item)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') setActiveLightbox(item)
                      }}
                      aria-label={`View full image for ${item.title}`}
                    >
                      <div className="memory-frame__glow" aria-hidden="true" />
                      <div className="memory-frame__inner">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="memory-frame__img"
                          loading="lazy"
                          onError={(e) => {
                            // Fallback to local copy if Supabase URL fails
                            if (e.currentTarget.src !== item.image) {
                              e.currentTarget.src = item.image
                            }
                          }}
                        />
                        <div className="memory-frame__overlay">
                          <span className="memory-frame__zoom-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="11" cy="11" r="8" />
                              <line x1="21" y1="21" x2="16.65" y2="16.65" />
                              <line x1="11" y1="8" x2="11" y2="14" />
                              <line x1="8" y1="11" x2="14" y2="11" />
                            </svg>
                            <span>Enlarge Moment</span>
                          </span>
                        </div>
                      </div>
                      <div className="memory-frame__caption">
                        <span>{item.date}</span>
                        <span>•</span>
                        <span>{item.venue}</span>
                      </div>
                    </div>
                  </div>

                  {/* Story & Content Column */}
                  <div className="memory-col memory-col--story">
                    <div className="memory-card">
                      <div className="memory-card__header">
                        <span className="memory-card__chapter">Chapter {item.chapter}</span>
                        <span className="memory-card__tag">{item.tag}</span>
                      </div>

                      <h3 className="memory-card__title">{item.title}</h3>
                      <h4 className="memory-card__subtitle">{item.subtitle}</h4>

                      <p className="memory-card__desc">{item.description}</p>

                      {item.quote && (
                        <blockquote className="memory-card__quote">
                          “{item.quote}”
                        </blockquote>
                      )}

                      <div className="memory-card__footer">
                        <div className="memory-card__pills">
                          {item.highlights.map((h, idx) => (
                            <span key={idx} className="memory-pill">
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="memories-cta memory-reveal" aria-label="Join our next event">
          <div className="memories-cta__inner">
            <div className="memories-cta__glow" aria-hidden="true" />
            <h2 className="memories-cta__title">Ready to Create the Next Memory?</h2>
            <p className="memories-cta__desc">
              From high-octane hackathons to deep system sprints, our doors are open for everyone eager to build, learn, and grow.
            </p>
            <div className="memories-cta__actions">
              <Button href="/events" variant="primary" size="lg">Explore Upcoming Events</Button>
              <Button href="/team" variant="ghost" size="lg">Meet the Team</Button>
              <Button href="/doubts" variant="secondary" size="lg">Ask a Doubt</Button>
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div
          className="memory-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeLightbox.title}
          onClick={() => setActiveLightbox(null)}
        >
          <div className="memory-lightbox__backdrop" />
          <div
            className="memory-lightbox__content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="memory-lightbox__close"
              onClick={() => setActiveLightbox(null)}
              aria-label="Close modal"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="memory-lightbox__image-wrap">
              <img
                src={activeLightbox.image}
                alt={activeLightbox.title}
                className="memory-lightbox__img"
              />
            </div>
            <div className="memory-lightbox__details">
              <div className="memory-lightbox__meta">
                <span className="memory-card__chapter">Chapter {activeLightbox.chapter}</span>
                <span className="memory-card__tag">{activeLightbox.tag}</span>
                <span className="memory-lightbox__date">{activeLightbox.date} · {activeLightbox.venue}</span>
              </div>
              <h3 className="memory-lightbox__title">{activeLightbox.title}</h3>
              <p className="memory-lightbox__desc">{activeLightbox.description}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

