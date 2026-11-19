import { useState } from 'react'
import './TeamCard.css'

/**
 * TeamCard
 * ========
 * Displays a team member with photo, name, role, department, and bio.
 */
export default function TeamCard({ member, className = '' }) {
  const {
    name,
    role,
    tier,
    department,
    photo,
    photo_url,
    fallback_photo,
    bio,
    contact,
    contactType,
    linkedin,
  } = member

  const [currentSrc, setCurrentSrc] = useState(photo || photo_url)
  const [imgError, setImgError] = useState(false)

  const handleImgError = () => {
    if (fallback_photo && currentSrc !== fallback_photo) {
      setCurrentSrc(fallback_photo)
      return
    }
    if (name?.toLowerCase().includes('renesha') && currentSrc !== '/team/renesha_sagar.jpg') {
      setCurrentSrc('/team/renesha_sagar.jpg')
      return
    }
    if (name?.toLowerCase().includes('madhav') && currentSrc !== '/team/madhav_gairola.jpg') {
      setCurrentSrc('/team/madhav_gairola.jpg')
      return
    }
    setImgError(true)
  }

  const initials = name
    ? name
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '?'

  return (
    <article className={`team-card team-card--${tier || 'member'} ${className}`.trim()}>
      {/* Photo / Avatar */}
      <div className="team-card__photo" aria-hidden="true">
        {!imgError && currentSrc ? (
          <img
            src={currentSrc}
            alt={`Photo of ${name}`}
            loading="lazy"
            onError={handleImgError}
            className="team-card__photo-img"
          />
        ) : (
          <span className="team-card__photo-initials">{initials}</span>
        )}
      </div>

      {/* Info */}
      <div className="team-card__info">
        <h3 className="team-card__name">{name}</h3>
        <span className="team-card__role">{role}</span>
        {department && (
          <span className="team-card__dept">{department}</span>
        )}
        {bio && <p className="team-card__bio">{bio}</p>}
      </div>

      {/* Contact */}
      {(contact || linkedin) && (
        <div className="team-card__contact">
          {contact && contactType === 'email' && (
            <a
              href={`mailto:${contact}`}
              className="team-card__contact-link"
              aria-label={`Email ${name}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Email
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="team-card__contact-link"
              aria-label={`${name} on LinkedIn`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
          )}
        </div>
      )}
    </article>
  )
}
