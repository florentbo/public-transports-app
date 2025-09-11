# Frontend Analysis - React Web App

## Overview

Analysis of the working React web frontend at `/home/florent/personal-dev/public-transports/public-transport-front/` to understand patterns for replication in React Native.

## 📱 Functional Flow & User Journey

### Screen Structure (2-Screen Master-Detail Pattern)

```
1. Journey List Screen (Home)
   ↓ [User clicks a journey]
2. Journey Detail Screen (Live Arrivals)
   ↓ [User clicks back]
1. Journey List Screen
```

### Screen 1: Journey List (Master List)

**Purpose**: Shows all saved journeys (routes) for the current user

**What it displays**:

- List of personal journeys/routes
- Each journey shows: `Origin → Destination` (e.g., "Home → Work")
- Currently labeled "Nearby Stations" (misleading title)

**User Actions**:

- Click on any journey to see live transport options

**Data Source**:

- `GET /journeys` - Fetches user's saved journeys from backend

**Component**: `JourneyList.tsx`

### Screen 2: Journey Detail (Detail View)

**Purpose**: Shows real-time arrival information for a specific journey

**What it displays**:

- Live arrival times for trains/trams/buses
- Transport line numbers (e.g., "Line 4")
- Station and direction info (e.g., "Central Station → North Terminal")
- Next arrival times in minutes (e.g., "3 min, 8 min, 15 min")
- Platform information when available
- Different icons for metro vs tram

**User Actions**:

- Click "Back to stations" to return to journey list

**Data Source**:

- `GET /journeys/{journeyId}/transport-options` - Fetches real-time arrivals

**Component**: `JourneyDetail.tsx`

### 🎯 User Flow Example

1. User opens app → Sees their saved journeys (Home→Work, Home→Gym, etc.)
2. User taps "Home→Work"
3. App shows next trains/buses for that route with arrival times
4. User sees "Metro Line 4 - arriving in 3 minutes"
5. User goes to catch that transport
6. Can go back to see other saved journeys

## 🏗️ Technical Architecture

### Tech Stack

```json
{
  "framework": "React 19 + TypeScript",
  "build_tool": "Vite",
  "styling": "TailwindCSS",
  "data_fetching": "React Query (@tanstack/react-query)",
  "code_generation": "Kubb",
  "icons": "Lucide React"
}
```

### Data Flow Architecture

```
OpenAPI Spec (Backend)
    ↓
Kubb Generator
    ↓
Generated Code (src/gen/)
    - Types (JourneyDTO, etc.)
    - React Query Hooks (useGetCurrentUserJourneys, etc.)
    ↓
Domain Mapping Layer (src/services/toDomain.ts)
    - Converts DTOs to domain models
    - JourneyDTO → Journey (simpler domain type)
    ↓
Custom Hooks (src/hooks/useJourneys.ts)
    - Wraps generated hooks
    - Applies domain mapping
    ↓
React Components
    - JourneyList.tsx
    - JourneyDetail.tsx
```

### Code Generation with Kubb

**Configuration** (`kubb.config.ts`):

```typescript
export default defineConfig({
  input: {
    path: "https://public-transports-back.fly.dev/v3/api-docs",
  },
  output: {
    path: "./src/gen",
    clean: true,
  },
  plugins: [
    pluginOas(),
    pluginTs(),
    pluginReactQuery({
      client: {
        baseURL: "https://public-transports-back.fly.dev",
      },
    }),
  ],
});
```

**Generated Files**:

- `src/gen/types/` - TypeScript interfaces matching OpenAPI
- `src/gen/hooks/` - React Query hooks for each endpoint
- Auto-generated on every `npm run dev` or `npm run build`

### Domain Mapping Pattern

**Key Files**:

- `src/services/toDomain.ts` - DTO to Domain conversion
- `src/types.ts` - Domain models (simplified for UI)
- `src/hooks/useJourneys.ts` - Custom hooks wrapping generated ones

**Example Mapping**:

```typescript
// DTO from API (complex)
JourneyDTO {
  id: string
  origin: { name: string, coordinates: {...} }
  destination: { name: string, coordinates: {...} }
}

// Domain Model (simple)
Journey {
  id: string
  origin: string  // just the name
  destination: string
}
```

**Mapping Function**:

```typescript
export function fromJourneys(dto: JourneyDTO[]): Journey[] {
  return dto.map((journey) => ({
    id: journey.id,
    origin: journey.origin.name,
    destination: journey.destination.name,
  }));
}
```

## 🔄 Data Patterns

### Hook Composition Pattern

```typescript
// Generated hook (from Kubb)
useGetCurrentUserJourneys()
    ↓
// Custom hook (domain mapping)
useJourneys() {
    const { data: rawData, isLoading, error } = useGetCurrentUserJourneys();
    const mappedData = rawData ? fromJourneys(rawData) : undefined;
    return { data: mappedData, isLoading, error };
}
    ↓
// Component usage
const { data: journeys, isLoading, error } = useJourneys();
```

### API Endpoints Used

1. **GET /journeys**
   - Returns: `JourneyDTO[]`
   - Purpose: List user's saved journeys
   - Hook: `useGetCurrentUserJourneys()`

2. **GET /journeys/{journeyId}/transport-options**
   - Returns: `TransportOptionsDTO`
   - Purpose: Real-time arrivals for journey
   - Hook: `useGetTransportOptions(journeyId)`

## 📊 Data Models

### Domain Types (`src/types.ts`)

```typescript
interface Journey {
  id: string;
  origin: string;
  destination: string;
}

interface TransportOption {
  type: "metro" | "tram";
  line: string;
  startStation: string;
  direction: string;
  arrivals: ArrivalTime[];
}

interface ArrivalTime {
  time: number;
  platform?: string;
}
```

### Component State Management

**App.tsx** (Route State):

```typescript
const [selectedJourney, setSelectedJourney] = useState<string | null>(null);

// Conditional rendering
{!selectedJourney ? (
  <JourneyList onJourneySelect={setSelectedJourney} />
) : (
  <JourneyDetail
    journeyId={selectedJourney}
    onBack={() => setSelectedJourney(null)}
  />
)}
```

## 🎨 UI Patterns

### Component Structure

```
App.tsx (Router + State)
├── Header.tsx (Static)
├── JourneyList.tsx (Master List)
│   ├── LoadingSpinner.tsx
│   └── useJourneys() hook
└── JourneyDetail.tsx (Detail View)
    ├── LoadingSpinner.tsx
    └── useRoutes(journeyId) hook
```

### Loading & Error States

All components handle:

- **Loading**: Shows spinner
- **Error**: Shows error message
- **Empty**: Graceful handling of no data

### Styling Approach

- **TailwindCSS** for all styling
- **Responsive design** with mobile-first approach
- **Consistent spacing** and color scheme
- **Hover effects** and transitions

## ⚠️ Current Limitations

- **No CRUD operations**: Can't add/edit/delete journeys
- **No user preferences**: No favorites, sorting, or customization
- **No offline support**: Requires internet connection
- **Misleading labels**: "Nearby Stations" should be "My Routes"
- **Limited error handling**: Basic error messages only

## 🚀 Successful Patterns to Replicate

### 1. Code Generation Strategy

- Use Kubb to auto-generate types and hooks from OpenAPI
- Automatic sync with backend API changes
- Type safety from API to UI

### 2. Domain Mapping Layer

- Separate DTOs from domain models
- Clean, simple interfaces for components
- Easy to test and maintain

### 3. Hook Composition

- Generated hooks + custom hooks + domain mapping
- Separation of concerns
- Reusable data logic

### 4. Component Structure

- Master-detail navigation pattern
- Consistent loading/error states
- Clear data flow

### 5. User Experience

- Simple, focused screens
- Clear visual hierarchy
- Responsive design

## 📝 Implementation Notes for React Native

When replicating in React Native:

1. **Replace Kubb with equivalent** for React Native (or adapt Kubb)
2. **Use PersonalRoute instead of Journey** terminology
3. **Add navigation** (React Navigation instead of state-based routing)
4. **Add CRUD operations** (create, edit, delete routes)
5. **Improve labeling** (use "My Routes" instead of "Nearby Stations")
6. **Add user preferences** (favorites, sorting, etc.)
7. **Consider offline support** with local storage

## 🔗 Key Files Reference

- **kubb.config.ts** - Code generation configuration
- **src/hooks/useJourneys.ts** - Custom data hook pattern
- **src/services/toDomain.ts** - DTO mapping examples
- **src/types.ts** - Domain model definitions
- **src/components/JourneyList.tsx** - Master list component
- **src/components/JourneyDetail.tsx** - Detail view component

This analysis should guide the React Native implementation to achieve similar functionality with PersonalRoute terminology and enhanced features.
