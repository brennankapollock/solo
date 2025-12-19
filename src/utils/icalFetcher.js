import ICAL from 'ical.js'

export async function fetchICalEvents(icalUrl) {
  if (!icalUrl || icalUrl === 'YOUR_ICAL_URL_HERE') {
    throw new Error('No calendar URL configured')
  }

  try {
    // Convert webcal:// to https://
    let url = icalUrl.replace('webcal://', 'https://')

    // Try to use CORS proxy if direct fetch fails
    let response
    try {
      console.log('Fetching calendar from:', url)
      response = await fetch(url, {
        headers: {
          'Accept': 'text/calendar'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (corsError) {
      console.warn('Direct fetch failed, trying with CORS proxy:', corsError)
      // Use allorigins.win as a CORS proxy
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
      response = await fetch(proxyUrl)

      if (!response.ok) {
        throw new Error(`CORS proxy failed! status: ${response.status}`)
      }
    }

    const icalData = await response.text()

    if (!icalData || icalData.trim().length === 0) {
      throw new Error('Empty calendar data received')
    }

    const jcalData = ICAL.parse(icalData)
    const comp = new ICAL.Component(jcalData)
    const vevents = comp.getAllSubcomponents('vevent')

    if (vevents.length === 0) {
      console.warn('No events found in calendar')
      return []
    }

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
    throw error
  }
}
