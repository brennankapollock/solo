# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a public event calendar web application designed to showcase curated events (concerts, raves, festivals, club events) with a bold, high-contrast design inspired by The Face magazine aesthetic.

## Current State

The repository contains a fully functional React + Vite web application with:
- Three calendar view modes (Month, Week, List)
- iCloud calendar integration via .ics parsing
- Event type filtering system
- Responsive design for desktop and mobile
- The Face magazine-inspired aesthetic

## Technical Stack

**Frontend**:
- React 18.3
- Vite 6.0 (build tool and dev server)
- ical.js (iCalendar parsing)
- date-fns (date manipulation)

**Styling**:
- Pure CSS with custom properties
- Anton font (display/headings)
- Roboto Condensed font (body text)

## Design Principles

1. **Bold Typography**: Large, uppercase headings using Anton font
2. **High Contrast**: Strict black and white color scheme with red accents
3. **Information Density**: Maximum content visibility with minimal scrolling
4. **Brutalist Aesthetic**: Raw, unpolished, magazine-style layout
5. **Responsive First**: Mobile and desktop optimized

## Key Files

- `src/App.jsx` - Main application component with view switching and filtering
- `src/components/MonthView.jsx` - Calendar month grid view
- `src/components/WeekView.jsx` - Week-based event view
- `src/components/ListView.jsx` - Chronological list of events
- `src/utils/icalFetcher.js` - iCloud calendar fetching and parsing
- `src/App.css` - Main application styles with The Face aesthetic
- `src/index.css` - Global styles and CSS variables

## Event Type System

Events are automatically categorized by keywords in their titles:
- **concert** - Live music performances
- **rave** - Electronic music events
- **festival** - Multi-day music festivals
- **club** - Club nights and DJ sets
- **other** - Uncategorized events

Categories can be customized in `src/utils/icalFetcher.js`

## iCloud Calendar Integration

The app fetches events from a public iCloud calendar URL (.ics format):
1. URL is configured via `VITE_ICAL_URL` environment variable
2. Events are fetched and parsed using ical.js
3. Parsed events are sorted by start date
4. Events are categorized by type based on title keywords

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server (port 3000)
npm run build        # Build for production
npm run preview      # Preview production build
```

## Color Variables

- `--black: #000000` - Primary text and borders
- `--white: #ffffff` - Background and inverse text
- `--red: #ff0000` - Accent color for emphasis
- `--gray: #808080` - Secondary elements
- `--light-gray: #d0d0d0` - Backgrounds
- `--dark-gray: #2a2a2a` - Dark accents

## Notes for Future Development

- Event data refreshes on page load (consider adding auto-refresh)
- Event types are inferred from titles (could be enhanced with custom fields)
- No backend - purely client-side application
- Works with any public .ics calendar feed, not just iCloud
