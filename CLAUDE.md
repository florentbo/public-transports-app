# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native public transport application built with Expo, TypeScript, and Clean Architecture principles. The app helps users find nearby public transport stops, routes, and schedules.

## Related Projects

- **Backend API**: `/home/florent/personal-dev/public-transports/public-transports-back/`
- **React Web App**: `/home/florent/personal-dev/public-transports/front/ui-first-try/` (reference implementation)
- **API Documentation**: https://public-transports-back.fly.dev/v3/api-docs
- **API Status**: PersonalRoute endpoints defined in OpenAPI spec, Java implementation pending

## Development Commands

### Core Development

```bash
# Start development server
npm start

# Platform-specific development
npm run android     # Android emulator/device
npm run ios        # iOS simulator/device
npm run web        # Web browser

# Code quality & validation
npm run lint          # Run ESLint (with React Native rules)
npm run typecheck     # TypeScript type checking (tsc --noEmit)
npm run validate      # Full validation (lint + typecheck + tests)
npm run validate:quick # Quick validation (lint + typecheck only)
```

### Testing

```bash
npm test                # Run all tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Generate coverage report

# Run specific test file
npx jest src/domain/entities/__tests__/Stop.test.ts

# Run tests matching pattern
npx jest --testNamePattern="should calculate distance"
```

## Architecture

### Clean Architecture Layers

The application follows Clean Architecture with Domain-Driven Design (DDD):

```
src/
├── domain/           # Core business logic (no external dependencies)
│   ├── entities/     # Business objects (Stop, Route, Trip)
│   ├── repositories/ # Repository interfaces
│   └── usecases/     # Business rules (FindNearbyStops, GetUpcomingArrivals, SearchRoutes)
│
├── infrastructure/   # External implementations
│   └── repositories/ # Concrete implementations (currently Mock*)
│
├── application/      # Application services
│   └── services/     # TransportService (dependency injection container)
│
└── presentation/     # UI Layer
    ├── components/   # Reusable UI components
    ├── hooks/        # Custom React hooks (useNearbyStops, useUpcomingArrivals)
    └── providers/    # Context providers (QueryProvider)
```

### Dependency Flow

- Dependencies flow inward: `Presentation → Application → Domain`
- Domain layer has zero external dependencies
- Repository interfaces in domain, implementations in infrastructure
- Use cases orchestrate business logic using repository interfaces

### Key Architectural Components

**TransportService** (`src/application/services/TransportService.ts`)

- Central dependency injection container
- Instantiates repositories and use cases
- Currently uses Mock repositories (easily swappable for real implementations)

**Repository Pattern**

- Interfaces defined in `domain/repositories/`
- Mock implementations in `infrastructure/repositories/`
- To add real API: implement interfaces in infrastructure layer

**State Management**

- React Query (@tanstack/react-query) for server state
- Custom hooks wrap use cases for React integration
- Automatic caching, refetching, and synchronization

### Navigation Structure

Using Expo Router (file-based routing):

```
app/
├── (tabs)/          # Tab navigation
│   ├── index.tsx    # Home screen (nearby stops)
│   └── explore.tsx  # Explore tab
├── _layout.tsx      # Root layout
└── +not-found.tsx   # 404 handler
```

## Quick Project Status

### Implemented Screens

- **Home Screen** (`app/(tabs)/index.tsx`) - Shows nearby transport stops with adjustable search radius
- **Explore Screen** (`app/(tabs)/explore.tsx`) - Contains default Expo template content (needs replacement with Routes functionality)

### Main Components

- **StopCard** (`src/presentation/components/StopCard.tsx`) - Displays stop information with distance and routes, includes touch handlers and route tags
- **QueryProvider** (`src/presentation/providers/QueryProvider.tsx`) - React Query provider for data management with 5-minute stale time
- **Custom Hooks**:
  - `useNearbyStops` - React Query hook with caching, calls TransportService.findNearbyStops.execute()
  - `useUpcomingArrivals` - For future stop detail screens (implemented but unused)

### Current Features

- **Nearby Stops Display** - Shows stops within configurable radius (0.5-5km) using FlatList
- **Search Radius Control** - TextInput with numeric keyboard for radius adjustment
- **Stop Information** - Name, code, routes, distance with formatted display (meters/kilometers)
- **Interactive Stop Cards** - TouchableOpacity with Alert dialog showing detailed stop info
- **Distance Calculation** - Haversine formula implementation in StopEntity.distanceFrom()
- **Mock Geolocation** - Fixed Paris coordinates (48.8566, 2.3522) in useState
- **Loading States** - Loading spinner, error states, empty list handling

### Mock Data

- **Location**: `src/infrastructure/repositories/Mock*.ts`
- **Stops**: 8 stops - Central Station, City Hall, University, Shopping Mall, Airport Terminal, Beach Resort, Mountain Lodge, Industrial District
- **Routes**: A-F lines with different transport types (Metro, Bus, Tram patterns)
- **Stop Coordinates**: Paris area (48.84-48.87 lat, 2.33-2.37 lon)
- **Schedules**: Generated trips every 15 minutes from 6 AM to midnight
- **Stop Codes**: Format like CS01, CH01, UN01, etc.

### Implementation Details

#### Dependency Injection (TransportService)

```typescript
// Central service in src/application/services/TransportService.ts
static findNearbyStops = new FindNearbyStops(MockStopRepository)
static getUpcomingArrivals = new GetUpcomingArrivals(MockTripRepository, MockRouteRepository)
static searchRoutes = new SearchRoutes(MockRouteRepository)
```

#### Domain Entities

- **StopEntity** - Has distanceFrom() method using Haversine formula
- **RouteEntity** - Transport line information with type (metro/bus/tram)
- **TripEntity** - Individual trip with departure time and stop sequence

#### Use Cases Implemented

- **FindNearbyStops** - Filters stops by radius and returns with distances
- **GetUpcomingArrivals** - Gets next arrivals for a stop (hook exists, screen pending)
- **SearchRoutes** - Search routes by name/type (implemented, UI pending)

#### React Query Integration

```typescript
// useNearbyStops pattern
queryKey: ["nearbyStops", lat, lon, radius]
staleTime: 5 minutes, gcTime: 10 minutes
enabled: lat !== 0 && lon !== 0
```

## TypeScript Configuration

### Path Aliases

```typescript
@/*                  → ./*
@/domain/*          → ./src/domain/*
@/infrastructure/*  → ./src/infrastructure/*
@/application/*     → ./src/application/*
@/presentation/*    → ./src/presentation/*
```

### Strict Mode

TypeScript strict mode is enabled. All code must pass type checking.

## Testing Strategy

### Test Structure

- Unit tests colocated in `__tests__` folders
- Test files named `*.test.ts(x)` or `*.spec.ts(x)`
- Jest with React Native Testing Library
- Coverage target: 80% for business logic

### Mock Configuration

- **Jest Setup** (`jest-setup.js`): Mocks expo-constants, expo-router, global.**DEV**
- **Path Aliases**: Configured in both `jest.config.js` and `tsconfig.json`
- **Test Environment**: Node environment with React Native Testing Library
- **Module Name Mapping**: All @/ paths mapped to correct src/ directories

## Adding New Features

### To add a new transport feature:

1. **Domain Layer**: Define entities and use cases
   - Create entity in `src/domain/entities/`
   - Define repository interface in `src/domain/repositories/`
   - Implement use case in `src/domain/usecases/`

2. **Infrastructure Layer**: Implement repository
   - Create implementation in `src/infrastructure/repositories/`

3. **Application Layer**: Register in TransportService
   - Add to dependency injection in `src/application/services/TransportService.ts`

4. **Presentation Layer**: Create UI
   - Create React Query hook in `src/presentation/hooks/`
   - Build components in `src/presentation/components/`
   - Add screens in `app/` directory

### To switch from mock to real data:

1. Implement repository interfaces with real API calls in `infrastructure/repositories/`
2. Update `TransportService` to use real repositories instead of Mock\*
3. Add environment configuration for API endpoints

## Current Mock Data

The app currently uses mock data for Paris public transport:

- 8 stops with coordinates around Paris
- 11 routes (6 metro lines, 3 bus routes, 2 tram lines)
- Trip schedules generated every 15 minutes from 6 AM to midnight

## Key Dependencies

- **expo**: ~53.0.22 - Expo SDK
- **react-native**: 0.79.6 - React Native framework
- **@tanstack/react-query**: ^5.87.0 - Server state management
- **react-hook-form**: ^7.62.0 - Form handling
- **zod**: ^4.1.5 - Schema validation
- **expo-router**: ~5.1.5 - File-based routing

## Validation Tools

### Git Commit Guidelines

- Use single-line commit messages (no multi-line descriptions)
- Commit message format: `type(scope): description`
- Types: feat, fix, docs, style, refactor, test, chore
- Keep messages concise and descriptive
- NO Co-Authored-By lines or additional metadata
- Examples:
  - `docs: Update project roadmap with API evolution strategy`
  - `feat: Add personal route display with metadata`
  - `fix: Correct TypeScript types for PersonalRoute entity`

### Pre-commit Hooks

- **Husky** + **lint-staged** automatically validate code before commits
- Runs ESLint, Prettier, and type checking on staged files
- Prevents committing code with React Native compatibility issues

### ESLint Configuration

- **eslint-plugin-react-native** with rules:
  - `no-unused-styles: error` - Prevents unused StyleSheet entries
  - `no-inline-styles: warn` - Encourages StyleSheet usage
  - `no-raw-text: error` - Requires ThemedText wrapper (skip: ["ThemedText"])
  - `split-platform-components: error` - Enforces platform-specific files
- **Custom Style Rules** - Blocks unsupported CSS properties:
  - `gap` → Use margin/padding instead
  - `backdropFilter` → Not supported in RN
  - `boxShadow` → Use shadowColor, shadowOffset, shadowOpacity, shadowRadius

### Quick Validation

```bash
npm run validate:quick  # Before starting development
npm run validate        # Before pushing code
```

## Development Notes

- React 19 is used (may cause peer dependency warnings - use `--legacy-peer-deps`)
- Jest tests run in Node environment
- Expo Go app can be used for mobile testing
- Mock data is generated in memory (no persistence)
- Pre-commit hooks ensure code quality and React Native compatibility
