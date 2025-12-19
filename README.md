# Events Calendar

A public event calendar with bold, high-contrast design inspired by The Face magazine aesthetic. Features month, week, and list views with event type filtering for concerts, raves, festivals, and club events.

## Features

- **Three View Modes**: Month, Week, and List views
- **Event Type Filters**: Filter by concert, rave, festival, club, or other
- **iCloud Calendar Integration**: Syncs with your public iCloud calendar
- **Bold Magazine Aesthetic**: High-contrast black and white design with red accents
- **Responsive Design**: Works on desktop and mobile

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure iCloud Calendar

1. Go to [iCloud.com](https://icloud.com) and sign in
2. Open Calendar
3. Click the share icon next to the calendar you want to make public
4. Check "Public Calendar"
5. Copy the URL provided

### 3. Set Environment Variable

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and add your iCloud calendar URL:

```
VITE_ICAL_URL=https://p01-calendars.icloud.com/published/2/YOUR_CALENDAR_ID_HERE
```

**Note**: If your URL starts with `webcal://`, replace it with `https://`

### 4. Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

## Event Type Detection

Events are automatically categorized based on keywords in the event title:
- **concert**: Events with "concert" in the title
- **rave**: Events with "rave" in the title
- **festival**: Events with "festival" in the title
- **club**: Events with "club" in the title
- **other**: All other events

You can customize this logic in `src/utils/icalFetcher.js`

## Build for Production

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Design Inspiration

The design takes inspiration from The Face magazine:
- Bold sans-serif typography (Anton for headings)
- High contrast black and white color scheme
- Red accent color for emphasis
- Brutalist/raw aesthetic
- Dense information layout

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **ical.js** - iCalendar parsing
- **date-fns** - Date manipulation and formatting
