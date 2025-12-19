import { format, isToday, isTomorrow, isPast, isFuture } from 'date-fns'
import './ListView.css'

function ListView({ events }) {
  const upcomingEvents = events.filter(event => isFuture(new Date(event.start)) || isToday(new Date(event.start)))
  const pastEvents = events.filter(event => isPast(new Date(event.start)) && !isToday(new Date(event.start)))

  const getDateLabel = (date) => {
    const eventDate = new Date(date)
    if (isToday(eventDate)) return 'Today'
    if (isTomorrow(eventDate)) return 'Tomorrow'
    return format(eventDate, 'EEEE, MMMM d, yyyy')
  }

  const EventItem = ({ event }) => (
    <div className={`list-event event-${event.type}`}>
      <div className="list-event-date">
        <div className="date-label">{getDateLabel(event.start)}</div>
        <div className="date-time">
          {event.allDay ? 'All Day' : format(new Date(event.start), 'h:mm a')}
        </div>
      </div>

      <div className="list-event-content">
        <div className="list-event-type">{event.type}</div>
        <h3 className="list-event-title">{event.title}</h3>
        {event.location && (
          <div className="list-event-location">📍 {event.location}</div>
        )}
        {event.description && (
          <div className="list-event-description">{event.description}</div>
        )}
      </div>
    </div>
  )

  return (
    <div className="list-view">
      {upcomingEvents.length > 0 && (
        <section className="list-section">
          <h2 className="list-section-title">Upcoming</h2>
          <div className="list-events">
            {upcomingEvents.map(event => (
              <EventItem key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {pastEvents.length > 0 && (
        <section className="list-section past">
          <h2 className="list-section-title">Past Events</h2>
          <div className="list-events">
            {pastEvents.reverse().map(event => (
              <EventItem key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {events.length === 0 && (
        <div className="no-events-message">
          No events found
        </div>
      )}
    </div>
  )
}

export default ListView
