import { useState } from 'react'
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday
} from 'date-fns'
import './MonthView.css'

function MonthView({ events }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  const getEventsForDay = (day) => {
    return events.filter(event =>
      isSameDay(new Date(event.start), day)
    )
  }

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))

  return (
    <div className="month-view">
      <div className="month-header">
        <button className="nav-btn" onClick={prevMonth}>←</button>
        <h2 className="month-title">{format(currentMonth, 'MMMM yyyy')}</h2>
        <button className="nav-btn" onClick={nextMonth}>→</button>
      </div>

      <div className="weekday-labels">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="weekday-label">{day}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map(day => {
          const dayEvents = getEventsForDay(day)
          const isCurrentMonth = isSameMonth(day, currentMonth)
          const isCurrentDay = isToday(day)

          return (
            <div
              key={day.toString()}
              className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isCurrentDay ? 'today' : ''}`}
            >
              <div className="day-number">{format(day, 'd')}</div>
              <div className="day-events">
                {dayEvents.map(event => (
                  <div
                    key={event.id}
                    className={`event-item event-${event.type}`}
                  >
                    <div className="event-time">
                      {!event.allDay && format(new Date(event.start), 'HH:mm')}
                    </div>
                    <div className="event-title">{event.title}</div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MonthView
