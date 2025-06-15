# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Monorepo Structure

This is a pnpm workspace monorepo with:
- `packages/issue-status/` - Main React/TypeScript package with Vite build system
- `apps/example/` - Example implementation that uses the main package

## Common Development Commands

### Root-level commands:
- `pnpm dev:example` - Start development server for example app
- `pnpm build:package` - Build the main issue-status package
- `pnpm build:example` - Build the example app

### Package-specific commands (in packages/issue-status/):
- `pnpm dev` - Start Vite development server
- `pnpm build` - TypeScript compile + Vite build
- `pnpm lint` - Run ESLint

### Example app commands (in apps/example/):
- `pnpm dev` - Run development server via issue-status CLI
- `pnpm build` - Build via issue-status CLI

## Architecture Overview

### Core Architecture
- **Provider System**: Pluggable data providers (`src/providers/`) allow different data sources (GitHub Issues, static data, etc.)
- **Type System**: Central types in `src/api/types.ts` define the data contracts
- **Configuration**: Uses `issue-status.config.ts` files for app configuration

### Key Components
- **Provider Interface**: All providers implement `getComponents()`, `getIncidents()`, and `getHistoricalIncidents()`
- **Component Status System**: 5-tier status system (operational, degradedPerformance, partialOutage, majorOutage, unknown)
- **Incident Management**: Handles both active incidents and historical incident tracking
- **Theme System**: Customizable theming with light/dark mode support

### Package Exports
The main package exports:
- Root export (`"."`) → `src/api/types.ts` (type definitions)
- `"./providers"` → `src/providers/index.ts` (provider implementations)

## Testing
Tests use standard testing patterns with `.test.ts` files alongside source code. Run tests with `vitest` in the example app.