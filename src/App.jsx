import { useState, useEffect } from 'react'
import './App.css'
import { fetchICalEvents } from './utils/icalFetcher'
import { format, isToday, isFuture } from 'date-fns'

function App() {
  const [events, setEvents] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const ICAL_URL = import.meta.env.VITE_ICAL_URL || ''

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log('Fetching from:', ICAL_URL)
      const fetchedEvents = await fetchICalEvents(ICAL_URL)
      console.log('Fetched events:', fetchedEvents)
      setEvents(fetchedEvents)
    } catch (error) {
      console.error('Error loading events:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const upcomingEvents = events
    .filter(e => isFuture(new Date(e.start)) || isToday(new Date(e.start)))
    .filter(e => activeFilter === 'all' || e.type === activeFilter)
    .slice(0, 6) // Show max 6 events to fit screen

  const eventTypes = [
    { id: 'all', label: 'ALL' },
    { id: 'concert', label: 'CONCERTS' },
    { id: 'rave', label: 'RAVES' },
    { id: 'festival', label: 'FESTIVALS' },
    { id: 'club', label: 'CLUBS' }
  ]

  return (
    <div className="magazine">
      {/* Giant Title Overlay */}
      <div className="title-overlay">
        <h1 className="mega-title">EVENTS</h1>
      </div>

      {/* Top Bar */}
      <div className="top-bar">
        <div className="issue">ISSUE 001</div>
        <div className="tagline">NIGHTLIFE / MUSIC / CULTURE</div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        {eventTypes.map(type => (
          <button
            key={type.id}
            className={`filter-tab ${activeFilter === type.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(type.id)}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="content-grid">
        {loading && (
          <div className="loading-state">
            <div className="loading-text">LOADING...</div>
          </div>
        )}

        {error && (
          <div className="error-state">
            <div className="error-text">ERROR: {error}</div>
            <div className="error-help">Check your .env file has VITE_ICAL_URL set</div>
          </div>
        )}

        {!loading && !error && upcomingEvents.length === 0 && (
          <div className="empty-state">
            <div className="empty-text">NO EVENTS</div>
            <div className="empty-help">Add events to your calendar or adjust filters</div>
          </div>
        )}

        {!loading && !error && upcomingEvents.map((event, index) => (
          <div
            key={event.id}
            className={`event-card event-card-${index} event-type-${event.type}`}
          >
            <div className="event-type-label">{event.type}</div>
            <div className="event-date">
              {format(new Date(event.start), 'MMM d')}
            </div>
            <h2 className="event-title">{event.title}</h2>
            <div className="event-time">
              {event.allDay ? 'ALL DAY' : format(new Date(event.start), 'h:mm a')}
            </div>
            {event.location && (
              <div className="event-location">{event.location}</div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Corner Text */}
      <div className="bottom-corner">
        <div className="reload-hint" onClick={loadEvents}>
          REFRESH
        </div>
      </div>
    </div>
  )
}

export default App
