# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a task and project management application designed specifically for solo users. The project is currently in the planning phase with only a PRD (Product Requirements Document) available.

## Current State

The repository contains only a Product Requirements Document (PRD.md) that outlines the vision for a streamlined personal productivity tool. No source code, build tools, or development infrastructure has been implemented yet.

## Key Product Concepts

**Vision**: A clean, fast, and intuitive personal productivity tool that combines task management and project organization without team collaboration features.

**Core Features Planned**:
- Task Management with natural language input
- Project Management with hierarchies and milestones
- Time Blocking and Calendar Integration
- Smart Lists and Custom Lists
- Offline-first architecture

**Technical Stack Recommendations** (from PRD):
- Frontend: React/Vue.js for web, Swift/SwiftUI for native apps
- Backend: Node.js/Deno or Go
- Database: PostgreSQL with Redis caching
- State Management: Zustand or Valtio

**Target Platforms**:
- Web Application (PWA)
- Native Mac Application
- Native iOS Application

## Design Principles

1. **Speed First**: All actions should complete in <100ms
2. **Keyboard Friendly**: Mouse optional for power users
3. **Information Density**: Show more, scroll less
4. **Offline-First**: Full functionality without internet
5. **No Feature Bloat**: Focused on solo user needs only

## Development Notes

This project is inspired by Linear and Things 3, prioritizing:
- Keyboard-first navigation with command palette (Cmd+K)
- Fast search across all content
- Clean, minimal interface design
- Natural planning hierarchy (Projects → Areas → Tasks)

When implementing features, refer to the detailed user stories and MVP scope in PRD.md to maintain focus on core solo-user functionality.