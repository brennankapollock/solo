import ICAL from 'ical.js'

export async function fetchICalEvents(icalUrl) {
  try {
    // Convert webcal:// to https://
    const url = icalUrl.replace('webcal://', 'https://')

    const response = await fetch(url)
    const icalData = await response.text()

    const jcalData = ICAL.parse(icalData)
    const comp = new ICAL.Component(jcalData)
    const vevents = comp.getAllSubcomponents('vevent')

    const events = vevents.map(vevent => {
      const event = new ICAL.Event(vevent)

      // Extract event type from title or description
      const summary = event.summary.toLowerCase()
      let type = 'other'

      if (summary.includes('concert')) type = 'concert'
      else if (summary.includes('rave')) type = 'rave'
      else if (summary.includes('festival')) type = 'festival'
      else if (summary.includes('club')) type = 'club'

      return {
        id: event.uid,
        title: event.summary,
        description: event.description || '',
        location: event.location || '',
        start: event.startDate.toJSDate(),
        end: event.endDate.toJSDate(),
        type: type,
        allDay: event.startDate.isDate
      }
    })

    // Sort by start date
    return events.sort((a, b) => a.start - b.start)
  } catch (error) {
    console.error('Error fetching iCal events:', error)
    return []
  }
}
