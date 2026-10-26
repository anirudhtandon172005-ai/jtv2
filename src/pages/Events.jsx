import React, { useState, useEffect, useMemo } from 'react';
import { fetchEvents } from '../services/eventService';
import { EventCard } from '../components/ui/EventCard';
import SectionHeader from '../components/ui/SectionHeader';
import './Events.css';

export default function Events() {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchEvents();
      setAllEvents(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const categories = useMemo(() => {
    const set = new Set();
    allEvents.forEach(e => {
      if (e.category) set.add(e.category);
    });
    return ['All', ...Array.from(set)];
  }, [allEvents]);

  const statuses = ['All', 'Upcoming', 'Past'];

  const filteredEvents = useMemo(() => {
    let list = allEvents;
    if (selectedCategory !== 'All') {
      list = list.filter(e => (e.category || '').toLowerCase() === selectedCategory.toLowerCase());
    }
    if (selectedStatus !== 'All') {
      list = list.filter(e => (e.status || '').toLowerCase() === selectedStatus.toLowerCase());
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(e =>
        (e.title || '').toLowerCase().includes(q) ||
        (e.description || '').toLowerCase().includes(q) ||
        (e.location || '').toLowerCase().includes(q) ||
        (e.tags || []).some(t => String(t).toLowerCase().includes(q))
      );
    }
    return list;
  }, [allEvents, selectedCategory, selectedStatus, searchQuery]);

  return (
    <div className="page events-page">
      <div className="container">
        <div className="events-page__header">
          <SectionHeader
            eyebrow="JYC Technical Calendar"
            title="Events, Hackathons & Bootcamps"
            subtitle="Explore our upcoming national hackathons, peer learning workshops, guest lectures, and annual technical fests."
            align="left"
          />
        </div>

        <div className="events-page__controls">
          <div className="events-page__tabs">
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', marginRight: '4px' }}>
              Category:
            </span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`events-page__tab ${selectedCategory === cat ? 'events-page__tab--active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div className="events-page__tabs">
              {statuses.map(st => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`events-page__tab ${selectedStatus === st ? 'events-page__tab--active' : ''}`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="events-page__search-wrap">
              <svg className="events-page__search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events by keyword..."
                className="events-page__search-input"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--color-text-muted)' }}>
            Loading events directory...
          </div>
        ) : filteredEvents.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px var(--container-px)',
            background: 'rgba(18, 16, 13, 0.6)',
            border: '1px dashed var(--color-border)',
            borderRadius: 'var(--radius-lg)'
          }}>
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)', marginBottom: '8px' }}>
              No Events Found
            </h3>
            <p style={{ color: 'var(--color-text-dim)', fontSize: 'var(--text-sm)', margin: 0 }}>
              Try adjusting your category filters or search term to see past and upcoming sessions.
            </p>
          </div>
        ) : (
          <div className="events-page__grid">
            {filteredEvents.map(evt => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
