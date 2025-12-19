import { useState, useEffect } from 'react'
import './App.css'
import MonthView from './components/MonthView'
import WeekView from './components/WeekView'
import ListView from './components/ListView'
import { fetchICalEvents } from './utils/icalFetcher'

function App() {
  const [view, setView] = useState('month')
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [activeFilters, setActiveFilters] = useState([])
  const [loading, setLoading] = useState(true)

  // You'll need to replace this with your actual iCloud calendar URL
  const ICAL_URL = import.meta.env.VITE_ICAL_URL || 'YOUR_ICAL_URL_HERE'

  useEffect(() => {
    loadEvents()
  }, [])

  useEffect(() => {
    filterEvents()
  }, [events, activeFilters])

  const loadEvents = async () => {
    try {
      setLoading(true)
      const fetchedEvents = await fetchICalEvents(ICAL_URL)
      setEvents(fetchedEvents)
    } catch (error) {
      console.error('Error loading events:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterEvents = () => {
    if (activeFilters.length === 0) {
      setFilteredEvents(events)
    } else {
      setFilteredEvents(
        events.filter(event => activeFilters.includes(event.type))
      )
    }
  }

  const toggleFilter = (filter) => {
    setActiveFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  const eventTypes = ['concert', 'rave', 'festival', 'club', 'other']

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Events</h1>

        <div className="view-switcher">
          <button
            className={`view-btn ${view === 'month' ? 'active' : ''}`}
            onClick={() => setView('month')}
          >
            Month
          </button>
          <button
            className={`view-btn ${view === 'week' ? 'active' : ''}`}
            onClick={() => setView('week')}
          >
            Week
          </button>
          <button
            className={`view-btn ${view === 'list' ? 'active' : ''}`}
            onClick={() => setView('list')}
          >
            List
          </button>
        </div>

        <div className="filters">
          {eventTypes.map(type => (
            <button
              key={type}
              className={`filter-btn ${activeFilters.includes(type) ? 'active' : ''}`}
              onClick={() => toggleFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </header>

      <main className="app-main">
        {loading ? (
          <div className="loading">Loading events...</div>
        ) : (
          <>
            {view === 'month' && <MonthView events={filteredEvents} />}
            {view === 'week' && <WeekView events={filteredEvents} />}
            {view === 'list' && <ListView events={filteredEvents} />}
          </>
        )}
      </main>
    </div>
  )
}

export default App
