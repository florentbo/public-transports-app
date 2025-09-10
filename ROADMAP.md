# Development Roadmap - Public Transports App

## 🚨 Current Status & Critical Blocker

**Bottom Line**: React Native development is **BLOCKED** until PersonalRoute backend is implemented.

### 📁 3-App Structure

```
/home/florent/personal-dev/public-transports/
├── PublicTransports/              # React Native app (Clean Architecture)
├── public-transport-front/        # React web app (WORKING - don't touch)
└── public-transports-back/        # Spring Boot backend (Journey works, PersonalRoute missing)
```

### ✅ What's Working

**Backend API**

- **Location**: `public-transports-back/`
- **Live URL**: https://public-transports-back.fly.dev
- **Status**: ✅ Journey API fully implemented and deployed
- **Used By**: React web app successfully

**React Web App**

- **Location**: `public-transport-front/`
- **Status**: ✅ Working production app
- **Features**: Journey list, detail views, Kubb + React Query integration
- **API**: Uses Journey endpoints successfully

**React Native App**

- **Location**: `PublicTransports/` (current directory)
- **Status**: 🚧 Clean Architecture foundation complete, mock data working
- **Features**: Nearby stops, route display, proper testing setup

### ❌ Critical Blocker: PersonalRoute Backend Missing

**Problem**:

- OpenAPI spec defines PersonalRoute endpoints completely (`specs.yaml`)
- Java implementation does NOT exist (only Journey controllers/services exist)
- React Native cannot integrate without working backend

**Location of Missing Code**: `public-transports-back/`

**What Needs Implementation**:

1. PersonalRoute entity (JPA)
2. PersonalRouteRepository (Spring Data)
3. PersonalRouteService (business logic)
4. PersonalRouteController (REST endpoints)

### 📊 API Status Matrix

| API Endpoint      | OpenAPI Spec | Java Implementation | React Web App | React Native   |
| ----------------- | ------------ | ------------------- | ------------- | -------------- |
| Journey API       | ✅ Complete  | ✅ Working          | ✅ Using      | 🚫 Not using   |
| PersonalRoute API | ✅ Complete  | ❌ **MISSING**      | 🚫 Not using  | 🚧 **BLOCKED** |

---

## 🎯 Immediate Next Steps - MUST DO FIRST

### Step 1: Switch to Backend Directory

```bash
cd /home/florent/personal-dev/public-transports/public-transports-back/
```

### Step 2: Examine Existing Journey Implementation

Look at these files to understand the pattern:

- Journey entity
- JourneyRepository
- JourneyService
- JourneyController

### Step 3: Implement PersonalRoute Classes

Create these 4 files following Journey patterns:

1. **PersonalRoute Entity** (JPA)
   - Match OpenAPI schema exactly
   - All fields from `specs.yaml`

2. **PersonalRouteRepository** (Spring Data JPA)
   - Basic CRUD operations
   - User-scoped queries

3. **PersonalRouteService** (Business Logic)
   - CRUD operations
   - Validation logic

4. **PersonalRouteController** (REST API)
   - Match these exact endpoints:
     - `GET /routes/personal`
     - `POST /routes/personal`
     - `GET /routes/personal/{routeId}`
     - `PUT /routes/personal/{routeId}`
     - `DELETE /routes/personal/{routeId}`

### Step 4: Test Locally

```bash
mvn spring-boot:run
curl http://localhost:8080/routes/personal
```

Should return `[]` (empty array), NOT 404.

### Step 5: Deploy

```bash
mvn clean package
fly deploy
```

### Step 6: Verify Live

```bash
curl https://public-transports-back.fly.dev/routes/personal
```

Should return `[]` (empty array), NOT 404.

### ✅ Backend Success Criteria

Backend implementation is complete when:

- [ ] All PersonalRoute endpoints return 200 (not 404)
- [ ] Can POST to create a PersonalRoute
- [ ] Can GET list of PersonalRoutes (empty array is fine)
- [ ] Journey API still works (backward compatibility)
- [ ] OpenAPI docs reflect actual implementation

---

## 📋 Implementation Tasks

### TASK 0: Backend PersonalRoute Implementation (MUST DO FIRST) 🚨

**Location**: `/home/florent/personal-dev/public-transports/public-transports-back/`

**What's Missing**: The Java backend has NO PersonalRoute implementation

**What to Implement**: Based on the existing OpenAPI spec (`specs.yaml`):

1. **PersonalRoute Entity** (JPA) - Match the OpenAPI schema exactly
2. **PersonalRouteRepository** (Spring Data JPA) - Basic CRUD operations
3. **PersonalRouteService** (Business Logic) - CRUD operations, filtering, validation
4. **PersonalRouteController** (REST API) - Match OpenAPI endpoints exactly

**Reference Implementation**: Look at existing Journey implementation for patterns

### TASK 1: Deploy Backend (30 min)

**Steps**:

1. Build: `mvn clean package`
2. Test locally: `mvn spring-boot:run`
3. Verify endpoints: `curl http://localhost:8080/routes/personal`
4. Deploy: `fly deploy`
5. Verify live: `curl https://public-transports-back.fly.dev/routes/personal`

**Success Criteria**:

- [ ] PersonalRoute API live at https://public-transports-back.fly.dev/routes/personal
- [ ] Journey API still works at /journeys
- [ ] Both return expected JSON
- [ ] API docs updated at /v3/api-docs

### TASK 2: React Native Implementation (BLOCKED UNTIL BACKEND READY)

**🚨 DO NOT START UNTIL TASK 0 & 1 ARE COMPLETE**

**Prerequisites**:

- [ ] Backend PersonalRoute API implemented and deployed
- [ ] Endpoints return 200 (not 404)
- [ ] Can create/read PersonalRoutes via API

**Phase 1: API Integration** (2-3 hours)

1. **Setup Kubb** (like web app)
   - Configure kubb.config.ts
   - Point to live PersonalRoute API
   - Generate TypeScript types

2. **Configure React Query**
   - Setup QueryClient
   - Create PersonalRoute hooks
   - Handle caching and errors

**Phase 2: Domain Layer** (1-2 hours)

1. **Create PersonalRoute entity**
   - Map from generated types
   - Add business logic methods
   - Write 1 domain test

2. **Create repository interface**
   - Define CRUD operations
   - Match API capabilities

**Phase 3: UI Implementation** (2-3 hours)

1. **Replace home screen**
   - Show PersonalRoutes instead of nearby stops
   - Use generated React Query hooks
   - Handle loading/error states

2. **Create PersonalRoute components**
   - PersonalRouteCard (display route info)
   - PersonalRouteList (list view)
   - Write 1 integration test

**Success Criteria**:

- [ ] React Native app displays PersonalRoutes from real API
- [ ] Can tap on PersonalRoute (basic interaction)
- [ ] Clean PersonalRoute naming throughout
- [ ] 2 tests written (1 domain, 1 integration)

---

## 🚀 Development Phases (After Backend Complete)

### Phase 1: Personal Routes Foundation 🎯

**Timeline**: 1-2 weeks (after backend ready)

#### User Story 1: Display Personal Routes

**As a** user  
**I want to** see my personal routes with nicknames  
**So that** I can quickly identify my routine journeys

**Tasks**:

1. **API Integration** (2-3 hours)
   - [ ] Install and configure Kubb (see web app: `/front/ui-first-try/kubb.config.ts`)
   - [ ] Generate types from updated API spec
   - [ ] Setup React Query (reference web app implementation)

2. **Domain Layer** (1-2 hours)
   - [ ] Create PersonalRoute entity (maps from Journey with metadata)
   - [ ] Create PersonalRouteRepository interface
   - [ ] Write PersonalRoute entity test ✅ (1/2 tests)

3. **Infrastructure Layer** (1 hour)
   - [ ] Implement ApiPersonalRouteRepository
   - [ ] Map JourneyDTO → PersonalRoute

4. **Presentation Layer** (2-3 hours)
   - [ ] Replace home screen to show personal routes
   - [ ] Create PersonalRouteCard component
   - [ ] Display nickname (fallback to origin→destination)
   - [ ] Show frequency badge and favorite star
   - [ ] Write integration test ✅ (2/2 tests)

**Acceptance Criteria**:

- [ ] Backend API enhanced with metadata fields
- [ ] Existing web app continues working
- [ ] Home screen shows personal routes with nicknames
- [ ] Routes display nickname or fallback to origin→destination
- [ ] Favorite routes show star indicator
- [ ] Frequency badges displayed (daily/weekly/occasional)
- [ ] Loading state while fetching routes
- [ ] Error handling for API failures
- [ ] Empty state when no routes exist

**Test Coverage**: 2 tests (1 domain, 1 integration)

#### User Story 2: Route Details Navigation

**As a** user  
**I want to** tap on a route to see transport options  
**So that** I can check arrival times for my journey

**Tasks**:

1. **Navigation Setup** (1 hour)
   - [ ] Setup navigation to route details screen
   - [ ] Pass route ID as navigation parameter

2. **Route Details Screen** (2-3 hours)
   - [ ] Create RouteDetailsScreen component
   - [ ] Fetch transport options for selected route
   - [ ] Display arrival times and platforms
   - [ ] Handle real-time updates if available

**Test Coverage**: 2 tests (1 navigation, 1 data fetching)

### Phase 2: Enhanced User Experience 🚀

**Timeline**: After Phase 1 completion

#### User Story 3: Add New Route

**As a** user  
**I want to** add a new route  
**So that** I can save additional frequent journeys

#### User Story 4: Edit/Delete Routes

**As a** user  
**I want to** manage my existing routes  
**So that** I can keep my route list current

#### User Story 5: Route Favorites/Ordering

**As a** user  
**I want to** reorder or mark favorite routes  
**So that** my most used routes appear first

### Phase 3: Advanced Features 📱

**Timeline**: Future consideration

#### User Story 6: Push Notifications

**As a** user  
**I want to** receive departure alerts  
**So that** I don't miss my transport

#### User Story 7: Offline Support

**As a** user  
**I want to** view my routes offline  
**So that** I can use the app without internet

#### User Story 8: Route Analytics

**As a** user  
**I want to** see my usage patterns  
**So that** I can optimize my routes

---

## 📊 Success Metrics & Timeline

### Backend Implementation Success:

- [ ] PersonalRoute endpoints return 200 (not 404)
- [ ] Can POST new personal route
- [ ] Can GET personal routes list
- [ ] OpenAPI spec matches actual API responses
- [ ] Deployed to https://public-transports-back.fly.dev/routes/personal

### React Native Ready When:

- [ ] Backend implemented ✅
- [ ] Kubb can generate types from live API
- [ ] React Query hooks can fetch data
- [ ] Can start implementing UI components

### Phase 1 Success Criteria:

- [ ] App launches and displays personal routes
- [ ] Navigation to route details works
- [ ] No crashes or major bugs
- [ ] Tests pass consistently
- [ ] Performance acceptable on device

### Learning Objectives (React Native):

- [ ] Understanding React Native project structure
- [ ] Working with React Query for state management
- [ ] Navigation patterns in React Native
- [ ] Platform differences (iOS vs Android)
- [ ] Testing React Native components

### ⏰ Time Estimates:

- **Backend Implementation**: 2-3 hours
- **Testing & Deployment**: 30 minutes
- **React Native Integration**: 3-4 hours (after backend is ready)
- **Phase 1**: 1-2 weeks (after backend complete)
- **Phase 2**: 2-3 weeks
- **Phase 3**: Future

---

## 🛡️ Development Principles

### Testing Strategy (Per TESTING-STRATEGY.md)

- **2 tests per user story** (1 domain, 1 integration)
- Focus on critical path and business logic
- Manual testing for UI/UX validation
- Increase coverage when patterns stabilize

### Architecture Guidelines (Per CLAUDE.md)

- Clean Architecture with DDD
- Domain layer independence
- Repository pattern for data access
- TypeScript strict mode throughout

### Code Quality

- ESLint + TypeScript compiler before commits
- Consistent formatting and naming
- Functional components with hooks
- Async/await over promises

---

## ⚠️ Risk Management

### Technical Risks

- **API Integration Complexity**: Mitigate with incremental implementation
- **React Native Learning Curve**: Leverage existing React knowledge
- **Device Testing**: Test on multiple devices early

### Project Risks

- **Scope Creep**: Stick to 2 tests per feature rule
- **Over-Engineering**: Remember this is a learning project
- **Time Investment**: Focus on Phase 1, defer advanced features

---

## 🚫 What NOT to Do

- **Don't** start React Native work until backend is complete
- **Don't** touch the React web app (it works, leave it alone)
- **Don't** worry about complex features yet (keep it simple)

---

## 🔗 Reference Materials

### Key Files to Reference

- **OpenAPI Spec**: `adapter-rest/src/main/resources/specs.yaml`
- **Journey Implementation**: Look for Journey\*.java files
- **Database Config**: Check existing JPA setup

### API Schema to Implement

From `specs.yaml`, the PersonalRoute schema includes:

- `id` (UUID)
- `routeName` (String)
- `origin` (PersonalLocation)
- `destination` (PersonalLocation)
- `routeType` (enum)
- `metadata` (object with isFavorite, color, etc.)
- `statistics` (read-only)
- `createdAt/updatedAt` (timestamps)

Start with basic fields first, add complex ones later.

### Reference Links

- **Backend Code**: `/home/florent/personal-dev/public-transports/public-transports-back/`
- **Working Web App**: `/home/florent/personal-dev/public-transports/public-transport-front/`
- **OpenAPI Spec**: `public-transports-back/adapter-rest/src/main/resources/specs.yaml`
- **Live API Docs**: https://public-transports-back.fly.dev/v3/api-docs

---

## 💡 Key Insights

**The documentation confusion was caused by planning React Native work when the backend didn't exist yet.**

Now that this is clear, backend implementation becomes the obvious first step. Once that's done, React Native integration will be straightforward.

**Focus backend first - everything else depends on it.**
