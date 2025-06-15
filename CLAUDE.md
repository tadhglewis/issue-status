# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Issue Status is a modern status page application built with Next.js that displays system health, incidents, and historical data. The project uses a provider-based architecture to support different data sources.

## Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production  
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests with Vitest

## Architecture

### Provider System
Core abstraction in `src/api/types.ts` defines the `Provider` interface with three methods:
- `getComponents()` - Fetch system components and their status
- `getIncidents()` - Fetch active incidents  
- `getHistoricalIncidents()` - Fetch closed incidents

Current providers:
- **GitHub Provider** (`src/providers/github.ts`) - Uses GitHub Issues API with specific labels as data source. Implements 10-minute caching due to rate limits.
- **Static Provider** (`src/providers/static.ts`) - Returns mock data for testing

Provider selection happens in `src/api/client.tsx` via `createApiClient()` function.

### Data Flow
1. `DataProvider` in `src/api/client.tsx` creates React context
2. Provider methods are called on mount to populate state
3. Components consume data via `useData()` hook
4. GitHub provider caches responses in localStorage for 10 minutes

### Status Types
Five status levels: `operational`, `degradedPerformance`, `partialOutage`, `majorOutage`, `unknown`

### Theming
Dual light/dark themes in `src/app/themes.ts` with status-specific colors. Theme switching handled by `ThemeProvider` based on system preferences.

## Key Configuration

- Uses styled-components for styling
- TypeScript with strict mode enabled
- Path alias `@/*` maps to `src/*`
- GitHub provider currently hardcoded to `tadhglewis/issue-status` repository