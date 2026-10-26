import { useState, useEffect, useMemo } from 'react'
import { fetchTeam } from '../services/teamService'
import TeamCard from '../components/ui/TeamCard'
import SectionHeader from '../components/ui/SectionHeader'
import { revealOnScroll, killScrollTriggers } from '../animations/gsap.config'
import { useReducedMotion } from '../hooks/useReducedMotion'
import './Team.css'

const FILTER_TABS = [
  { id: 'all', label: 'All Members' },
  { id: 'leadership', label: 'Leadership & Leads' },
  { id: 'technical', label: 'Technical' },
  { id: 'management', label: 'Management' },
  { id: 'social', label: 'Social Media' },
  { id: 'volunteer', label: 'Volunteers' },
]

export default function Team() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    let isMounted = true
    async function loadData() {
      try {
        const data = await fetchTeam()
        if (isMounted) {
          setMembers(data)
          setLoading(false)
        }
      } catch (err) {
        console.error('Failed to load team data', err)
        if (isMounted) setLoading(false)
      }
    }
    loadData()
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || loading) return
    const timer = setTimeout(() => {
      revealOnScroll('.team-card', { stagger: 0.05 })
      revealOnScroll('.team-section-header', { stagger: 0.04 })
    }, 50)
    return () => {
      clearTimeout(timer)
      killScrollTriggers()
    }
  }, [prefersReducedMotion, loading, activeTab, searchQuery])

  // Filtered members
  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      // Tab matching
      let tabMatch = true
      if (activeTab === 'leadership') {
        tabMatch = m.tier === 'head' || m.tier === 'lead'
      } else if (activeTab === 'technical') {
        tabMatch = (m.department || '').toLowerCase().includes('technical')
      } else if (activeTab === 'management') {
        tabMatch = (m.department || '').toLowerCase().includes('management')
      } else if (activeTab === 'social') {
        tabMatch = (m.department || '').toLowerCase().includes('social')
      } else if (activeTab === 'volunteer') {
        tabMatch = m.tier === 'volunteer'
      }

      // Search matching
      let searchMatch = true
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        searchMatch =
          (m.name || '').toLowerCase().includes(q) ||
          (m.role || '').toLowerCase().includes(q) ||
          (m.department || '').toLowerCase().includes(q)
      }

      return tabMatch && searchMatch
    })
  }, [members, activeTab, searchQuery])

  // Categorized sections for default "All" view
  const isDefaultView = activeTab === 'all' && !searchQuery.trim()
  const leadership = useMemo(() => members.filter((m) => m.tier === 'head' || m.tier === 'lead'), [members])
  const technical = useMemo(
    () => members.filter((m) => (m.department === 'Technical') && m.tier !== 'head' && m.tier !== 'lead'),
    [members]
  )
  const management = useMemo(
    () => members.filter((m) => (m.department === 'Management') && m.tier !== 'head' && m.tier !== 'lead'),
    [members]
  )
  const crossDomain = useMemo(
    () => members.filter((m) => (m.department || '').includes('&')),
    [members]
  )
  const social = useMemo(
    () => members.filter((m) => (m.department || '').toLowerCase().includes('social') && m.tier !== 'head'),
    [members]
  )
  const general = useMemo(
    () => members.filter((m) => m.department === 'General'),
    [members]
  )

  return (
    <main id="main-content" className="page team-page">
      <div className="container">
        {/* Page header */}
        <header className="team-page__header">
          <SectionHeader
            eyebrow="The Team"
            title="The people behind JYC Technical."
            subtitle="Explore our club leadership, core architects, management leads, and active members."
          />
        </header>

        {/* Sync & Count status badge */}
        <div className="team-sync-bar">
          <div className="team-sync-badge">
            <span className="team-sync-dot"></span>
            <span>{members.length} Members synced with Supabase</span>
          </div>

          <div className="team-search-wrap">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search member, role, or team..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="team-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="team-search-clear"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="team-filter-tabs" role="tablist">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`team-filter-btn ${activeTab === tab.id ? 'is-active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="team-loading">
            <div className="team-loading-spinner"></div>
            <p>Loading team members from Supabase...</p>
          </div>
        ) : isDefaultView ? (
          /* Structured Sections View */
          <div className="team-sections-container">
            {/* Leadership & Leads */}
            {leadership.length > 0 && (
              <section className="team-section" aria-label="Leadership & Leads">
                <h2 className="team-section-header">
                  <span>Leadership & Leads</span>
                  <span className="team-section-count">{leadership.length}</span>
                </h2>
                <div className="team-grid team-grid--core">
                  {leadership.map((m) => (
                    <TeamCard key={m.id || m.name} member={m} />
                  ))}
                </div>
              </section>
            )}

            {/* Technical Team */}
            {technical.length > 0 && (
              <section className="team-section" aria-label="Technical Team">
                <h2 className="team-section-header">
                  <span>Technical Domain</span>
                  <span className="team-section-count">{technical.length}</span>
                </h2>
                <div className="team-grid team-grid--core">
                  {technical.map((m) => (
                    <TeamCard key={m.id || m.name} member={m} />
                  ))}
                </div>
              </section>
            )}

            {/* Management Team */}
            {management.length > 0 && (
              <section className="team-section" aria-label="Management Team">
                <h2 className="team-section-header">
                  <span>Management Domain</span>
                  <span className="team-section-count">{management.length}</span>
                </h2>
                <div className="team-grid team-grid--core">
                  {management.map((m) => (
                    <TeamCard key={m.id || m.name} member={m} />
                  ))}
                </div>
              </section>
            )}

            {/* Cross-Domain / Dual */}
            {crossDomain.length > 0 && (
              <section className="team-section" aria-label="Interdisciplinary Members">
                <h2 className="team-section-header">
                  <span>Cross-Domain & Interdisciplinary</span>
                  <span className="team-section-count">{crossDomain.length}</span>
                </h2>
                <div className="team-grid team-grid--core">
                  {crossDomain.map((m) => (
                    <TeamCard key={m.id || m.name} member={m} />
                  ))}
                </div>
              </section>
            )}

            {/* Social Media & PR Team */}
            {social.length > 0 && (
              <section className="team-section" aria-label="Social Media Team">
                <h2 className="team-section-header">
                  <span>Social Media & Outreach</span>
                  <span className="team-section-count">{social.length}</span>
                </h2>
                <div className="team-grid team-grid--core">
                  {social.map((m) => (
                    <TeamCard key={m.id || m.name} member={m} />
                  ))}
                </div>
              </section>
            )}

            {/* General Team Members */}
            {general.length > 0 && (
              <section className="team-section" aria-label="General Members">
                <h2 className="team-section-header">
                  <span>Club Members</span>
                  <span className="team-section-count">{general.length}</span>
                </h2>
                <div className="team-grid team-grid--core">
                  {general.map((m) => (
                    <TeamCard key={m.id || m.name} member={m} />
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : (
          /* Filtered View */
          <div className="team-filtered-results">
            <div className="team-results-count">
              Showing {filteredMembers.length} of {members.length} members
            </div>
            {filteredMembers.length > 0 ? (
              <div className="team-grid team-grid--core">
                {filteredMembers.map((m) => (
                  <TeamCard key={m.id || m.name} member={m} />
                ))}
              </div>
            ) : (
              <div className="team-no-results">
                <p>No team members found matching "{searchQuery}".</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('')
                    setActiveTab('all')
                  }}
                  className="team-reset-btn"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
