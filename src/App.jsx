import { useState, useEffect } from 'react'
import './App.css'
import { fetchICalEvents } from './utils/icalFetcher'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isWeekend
} from 'date-fns'

function App() {
  const [events, setEvents] = useState([])
  const [currentMonth, setCurrentMonth] = useState(new Date())
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
      const fetchedEvents = await fetchICalEvents(ICAL_URL)
      setEvents(fetchedEvents)
    } catch (error) {
      console.error('Error loading events:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  const getEventsForDay = (day) => {
    return events
      .filter(e => isSameDay(new Date(e.start), day))
      .filter(e => activeFilter === 'all' || e.type === activeFilter)
  }

  const eventTypes = [
    { id: 'all', label: 'ALL' },
    { id: 'concert', label: 'CONCERTS' },
    { id: 'rave', label: 'RAVES' },
    { id: 'festival', label: 'FESTIVALS' },
    { id: 'club', label: 'CLUBS' }
  ]

  return (
    <div className="calendar">
      {/* Header */}
      <div className="calendar-header">
        <button className="nav-arrow" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
          ←
        </button>
        <h1 className="month-title">{format(currentMonth, 'MMMM')}</h1>
        <button className="nav-arrow" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
          →
        </button>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        {eventTypes.map(type => (
          <button
            key={type.id}
            className={`filter-pill ${activeFilter === type.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(type.id)}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {/* Weekday Headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
          <div key={day} className={`weekday-header ${i === 0 || i === 6 ? 'weekend' : ''}`}>
            {day}
          </div>
        ))}

        {/* Date Cells */}
        {days.map(day => {
          const dayEvents = getEventsForDay(day)
          const isCurrentMonth = isSameMonth(day, currentMonth)
          const isWeekendDay = isWeekend(day)

          return (
            <div
              key={day.toString()}
              className={`date-cell ${!isCurrentMonth ? 'other-month' : ''} ${isWeekendDay ? 'weekend' : ''}`}
            >
              <div className="date-number">{format(day, 'd')}</div>
              <div className="event-list">
                {dayEvents.map(event => (
                  <div key={event.id} className={`event-item type-${event.type}`}>
                    <span className="event-time">
                      {event.allDay ? '' : format(new Date(event.start), 'h:mm a')}
                    </span>
                    <span className="event-name">{event.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Loading/Error States */}
      {loading && (
        <div className="overlay-state">
          <div className="state-message">Loading...</div>
        </div>
      )}

      {error && (
        <div className="overlay-state">
          <div className="state-message error">{error}</div>
          <div className="state-help">Check console for details</div>
        </div>
      )}
    </div>
  )
}

export default App
