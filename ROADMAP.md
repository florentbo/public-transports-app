# Development Roadmap - Public Transports App

## Current Status

- ✅ Backend API serving personal journeys at `https://public-transports-back.fly.dev`
- ✅ Web app with "My Routes" functionality using Kubb + React Query
- ✅ React Native app with "Nearby Stops" (to be replaced)
- ✅ Testing strategy documented (2 tests per feature)

## Phase 1: Personal Routes Foundation with API Evolution 🎯

### Step 1: Backend API Evolution (2-3 hours)

**Goal**: Enhance API with personal context while maintaining backward compatibility

**Tasks:**

1. Add optional metadata fields to JourneyDTO:
   - [ ] nickname (e.g., "Morning commute")
   - [ ] frequency (daily/weekly/occasional)
   - [ ] isFavorite flag
   - [ ] lastUsed timestamp
   - [ ] usageCount

2. Add new endpoints (optional):
   - [ ] GET /journeys/favorites (filter favorites)
   - [ ] PATCH /journeys/{id}/metadata (update metadata only)

3. Deploy and verify:
   - [ ] Existing web app still works
   - [ ] New fields available in API

### Step 2: React Native Implementation (1 week)

#### User Story 1: Display Personal Routes

**As a** user  
**I want to** see my personal routes with nicknames  
**So that** I can quickly identify my routine journeys

**Tasks:**

1. **API Integration** (2-3 hours)
   - [ ] Install and configure Kubb
   - [ ] Generate types from updated API spec
   - [ ] Setup React Query

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

**Acceptance Criteria:**

- [ ] Backend API enhanced with metadata fields
- [ ] Existing web app continues working
- [ ] Home screen shows personal routes with nicknames
- [ ] Routes display nickname or fallback to origin→destination
- [ ] Favorite routes show star indicator
- [ ] Frequency badges displayed (daily/weekly/occasional)
- [ ] Loading state while fetching routes
- [ ] Error handling for API failures
- [ ] Empty state when no routes exist

**Test Coverage:** 2 tests (1 domain, 1 integration)

#### User Story 2: Route Details Navigation

**As a** user  
**I want to** tap on a route to see transport options  
**So that** I can check arrival times for my journey

**Tasks:**

1. **Navigation Setup** (1 hour)
   - [ ] Setup navigation to route details screen
   - [ ] Pass route ID as navigation parameter

2. **Route Details Screen** (2-3 hours)
   - [ ] Create RouteDetailsScreen component
   - [ ] Fetch transport options for selected route
   - [ ] Display arrival times and platforms
   - [ ] Handle real-time updates if available

**Test Coverage:** 2 tests (1 navigation, 1 data fetching)

## Phase 2: Enhanced User Experience 🚀

### Epic: Improved Route Management

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

## Phase 3: Advanced Features 📱

### Epic: Smart Features

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

## Technical Milestones

### Milestone 1: API Integration Complete

- [ ] Kubb generating TypeScript types
- [ ] React Query managing data state
- [ ] Error boundaries handling failures
- [ ] Loading states throughout app

### Milestone 2: Feature Parity with Web App

- [ ] All web app routes functionality available
- [ ] Consistent data models between platforms
- [ ] Shared API contracts working correctly

### Milestone 3: Native Mobile Experience

- [ ] Touch-optimized UI components
- [ ] Platform-appropriate navigation patterns
- [ ] Performance optimized for mobile

## Development Principles

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

## Timeline Estimates

### Phase 1 (Priority 1): 1-2 weeks

- **Week 1**: API setup + Domain/Infrastructure layers
- **Week 2**: Presentation layer + testing + polish

### Phase 2 (Priority 2): 2-3 weeks

- Enhanced CRUD operations for routes
- Improved UX and navigation

### Phase 3 (Priority 3): Future

- Advanced features based on usage feedback
- Performance optimizations
- Platform-specific enhancements

## Success Metrics

### Phase 1 Success Criteria

- [ ] App launches and displays personal routes
- [ ] Navigation to route details works
- [ ] No crashes or major bugs
- [ ] Tests pass consistently
- [ ] Performance acceptable on device

### Learning Objectives (React Native)

- [ ] Understanding React Native project structure
- [ ] Working with React Query for state management
- [ ] Navigation patterns in React Native
- [ ] Platform differences (iOS vs Android)
- [ ] Testing React Native components

## Risk Management

### Technical Risks

- **API Integration Complexity**: Mitigate with incremental implementation
- **React Native Learning Curve**: Leverage existing React knowledge
- **Device Testing**: Test on multiple devices early

### Project Risks

- **Scope Creep**: Stick to 2 tests per feature rule
- **Over-Engineering**: Remember this is a learning project
- **Time Investment**: Focus on Phase 1, defer advanced features

## Next Immediate Actions

1. **Today**: Update backend API with optional metadata fields
2. **Tomorrow**: Deploy backend and verify compatibility
3. **This Week**: Setup Kubb and implement React Native app
4. **Next Week**: Complete UI and testing

## Notes

- This roadmap follows our pragmatic testing approach (TESTING-STRATEGY.md)
- Architecture aligns with Clean Architecture guidelines (CLAUDE.md)
- Project vision documented in PROJECT-VISION.md
- Focus on learning React Native while building useful functionality
- Each phase can be evaluated independently for continuation
