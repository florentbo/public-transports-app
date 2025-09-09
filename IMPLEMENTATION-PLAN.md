# Implementation Plan - PersonalRoute First Approach

## Core Principle

Start with PersonalRoute naming everywhere. Small steps. Ship fast.

## Current State

- ✅ React Web App works with Journey API (DON'T TOUCH IT)
- ✅ Backend has Journey API working
- ❌ Backend needs PersonalRoute API
- ❌ React Native needs to be built with PersonalRoute

---

## TASK 1: Documentation Reorganization (30 min) ⬅️ START HERE

### What to Do

1. Copy `/public-transports-back/docs/domain-model.md` → `DOMAIN-MODEL-FUTURE.md`
2. Create new simple `domain-model.md` with 8-field PersonalRoute
3. Update DOCUMENTATION-INDEX.md to reference both files

### Simple PersonalRoute Model (8 fields only)

```java
class PersonalRoute {
    UUID id
    String userId
    String nickname      // "Morning commute"
    String origin        // "Home" - just text
    String destination   // "Work" - just text
    Boolean isFavorite
    LocalDateTime createdAt
    LocalDateTime updatedAt
}
```

### Why First?

- Sets the direction
- No code changes
- Clear vision

---

## TASK 2: Backend PersonalRoute Entity (2 hours)

### What to Build

1. Create PersonalRoute.java entity (8 fields)
2. Create PersonalRouteRepository.java (Spring Data JPA)
3. Create PersonalRouteService.java (basic CRUD)
4. Create PersonalRouteController.java with endpoints:
   - GET /api/personal-routes
   - POST /api/personal-routes
   - GET /api/personal-routes/{id}
   - PUT /api/personal-routes/{id}
   - DELETE /api/personal-routes/{id}

### What NOT to Build

- ❌ No complex statistics
- ❌ No schedules
- ❌ No transport segments
- ❌ Keep it SIMPLE

### Success Criteria

- Can create a PersonalRoute via API
- Can list PersonalRoutes
- Journey API still works

---

## TASK 3: Deploy Backend (30 min)

### Steps

1. Build: `mvn clean package`
2. Test locally: `mvn spring-boot:run`
3. Deploy: `fly deploy`
4. Verify both APIs work:
   - Journey API: https://public-transports-back.fly.dev/journeys
   - PersonalRoute API: https://public-transports-back.fly.dev/api/personal-routes

---

## TASK 4: React Native PersonalRoute Domain (1 hour)

### What to Build

```typescript
// src/domain/entities/PersonalRoute.ts
export class PersonalRoute {
  constructor(
    public id: string,
    public userId: string,
    public nickname: string,
    public origin: string,
    public destination: string,
    public isFavorite: boolean = false,
  ) {}
}

// src/domain/repositories/PersonalRouteRepository.ts
export interface PersonalRouteRepository {
  findAll(): Promise<PersonalRoute[]>;
  findById(id: string): Promise<PersonalRoute>;
  save(route: PersonalRoute): Promise<PersonalRoute>;
  delete(id: string): Promise<void>;
}
```

### No Journey Naming

- Start clean with PersonalRoute
- No legacy to clean up later

---

## TASK 5: React Native API Integration (2 hours)

### What to Build

1. Configure Kubb to generate from PersonalRoute endpoints
2. Implement ApiPersonalRouteRepository
3. Create usePersonalRoutes hook
4. Update home screen to show PersonalRoutes

### Reference

- Look at React Web App's Kubb config
- But use PersonalRoute naming

---

## FUTURE TASKS (Not Now!)

### Phase 2 (When Basic Works)

- Add `lastUsed` field to PersonalRoute
- Add usage counter
- Add basic sorting by usage

### Phase 3 (User Feedback)

- Add coordinates to origin/destination
- Add transport options
- Add real-time arrivals

### Phase 4 (Much Later)

- Statistics
- Predictions
- ML features

---

## Timeline

### Week 1

- Day 1: TASK 1 (Documentation) ✓
- Day 2: TASK 2 (Backend Entity)
- Day 3: TASK 3 (Deploy)

### Week 2

- Day 4-5: TASK 4 & 5 (React Native)
- Day 6-7: Testing & Polish

### Result

- Working PersonalRoute API
- React Native app using PersonalRoute
- Clean naming from start
- Ready to iterate

---

## Key Decisions

### What We Keep

- ✅ React Web App (Journey) - IT WORKS, DON'T TOUCH
- ✅ Journey API - For backward compatibility
- ✅ Clean Architecture in React Native

### What We Add

- ✅ PersonalRoute API (simple version)
- ✅ React Native with PersonalRoute

### What We Defer

- ⏸️ Complex domain model
- ⏸️ Statistics and ML
- ⏸️ Social features
- ⏸️ Everything not essential for MVP

---

## Success Metrics

### TASK 1 Complete When:

- [ ] DOMAIN-MODEL-FUTURE.md exists with complex model
- [ ] domain-model.md has simple 8-field PersonalRoute
- [ ] DOCUMENTATION-INDEX.md references both files

### TASK 2 Complete When:

- [ ] PersonalRoute entity compiles
- [ ] Can POST to create PersonalRoute
- [ ] Can GET list of PersonalRoutes
- [ ] Journey API still works

### TASK 3 Complete When:

- [ ] PersonalRoute API live at https://public-transports-back.fly.dev/api/personal-routes
- [ ] Journey API still works at /journeys
- [ ] Both return expected JSON

### TASK 4 Complete When:

- [ ] PersonalRoute domain entity exists
- [ ] PersonalRouteRepository interface defined
- [ ] TypeScript compiles cleanly

### TASK 5 Complete When:

- [ ] React Native app displays PersonalRoutes
- [ ] Can tap on PersonalRoute (basic interaction)
- [ ] No Journey naming in React Native code
