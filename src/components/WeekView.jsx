import { useState } from 'react'
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameDay,
  addWeeks,
  subWeeks,
  isToday
} from 'date-fns'
import './WeekView.css'

function WeekView({ events }) {
  const [currentWeek, setCurrentWeek] = useState(new Date())

  const weekStart = startOfWeek(currentWeek)
  const weekEnd = endOfWeek(currentWeek)

  const days = eachDayOfInterval({ start: weekStart, end: weekEnd })

  const getEventsForDay = (day) => {
    return events.filter(event =>
      isSameDay(new Date(event.start), day)
    ).sort((a, b) => new Date(a.start) - new Date(b.start))
  }

  const nextWeek = () => setCurrentWeek(addWeeks(currentWeek, 1))
  const prevWeek = () => setCurrentWeek(subWeeks(currentWeek, 1))

  return (
    <div className="week-view">
      <div className="week-header">
        <button className="nav-btn" onClick={prevWeek}>←</button>
        <h2 className="week-title">
          {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
        </h2>
        <button className="nav-btn" onClick={nextWeek}>→</button>
      </div>

      <div className="week-grid">
        {days.map(day => {
          const dayEvents = getEventsForDay(day)
          const isCurrentDay = isToday(day)

          return (
            <div
              key={day.toString()}
              className={`week-day ${isCurrentDay ? 'today' : ''}`}
            >
              <div className="week-day-header">
                <div className="week-day-name">{format(day, 'EEE')}</div>
                <div className="week-day-number">{format(day, 'd')}</div>
              </div>

              <div className="week-day-events">
                {dayEvents.length === 0 ? (
                  <div className="no-events">No events</div>
                ) : (
                  dayEvents.map(event => (
                    <div
                      key={event.id}
                      className={`week-event event-${event.type}`}
                    >
                      <div className="week-event-time">
                        {event.allDay ? 'All Day' : format(new Date(event.start), 'HH:mm')}
                      </div>
                      <div className="week-event-title">{event.title}</div>
                      {event.location && (
                        <div className="week-event-location">{event.location}</div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default WeekView
