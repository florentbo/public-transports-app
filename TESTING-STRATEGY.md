# Testing Strategy for Public Transports App

## Executive Summary

For our first user story ("Display Personal Routes"), we will write **2 tests total**:

1. **One domain test** - PersonalRoute entity validation (with metadata)
2. **One integration test** - API to screen flow with personal context

_Note: Updated from "Journey" to "PersonalRoute" to align with vision while using Journey API internally._

This pragmatic approach balances quality assurance with development velocity for a senior backend developer learning React Native.

## Profile Context

- **Developer**: Senior backend developer with extensive experience
- **React Native Experience**: Beginner
- **Project Type**: Personal MVP / Learning project
- **Primary Goal**: Learn React Native while building a useful app

## Testing Philosophy Evolution

### Initial Approach (Over-Engineered)

Initially proposed 30+ tests following strict TDD with comprehensive coverage:

- Every entity, use case, repository
- Every mapper and transformer
- Every UI component and screen
- Full unit, integration, and E2E coverage

**Problem**: Excessive overhead for personal project, slows learning velocity

### Refined Approach (Pragmatic)

After discussion and research, settled on 2-3 essential tests:

- Focus on critical path only
- Skip obvious/trivial code
- Leverage TypeScript for type safety
- Trust senior developer instincts

## Authoritative Sources & Justification

### Jason Taylor (Clean Architecture)

**Source**: Clean Architecture Solution Template, Microsoft MVP
**Key Insight**: "Test the behavior, not the implementation"
**Application**: Focus on testing business logic (domain) over infrastructure

### Rodrigo Manguinho (Clean React Native)

**Source**: Clean React Native course, Brazilian software architect
**Key Insight**: "In real projects, we test what brings value"
**Application**: Test critical business logic and integration points only

### Robert C. Martin (Uncle Bob)

**Source**: Clean Architecture book, TDD advocate
**Key Insight**: "The goal of TDD is not 100% coverage but confidence in code"
**Application**: Even TDD pioneer acknowledges pragmatic testing

### Kent Beck (TDD Creator)

**Source**: Test-Driven Development by Example
**Key Insight**: "Test until fear turns to boredom"
**Application**: For experienced developers, fewer tests needed for confidence

### Kent C. Dodds (Testing JavaScript)

**Source**: Testing JavaScript applications
**Key Insight**: "Write tests. Not too many. Mostly integration."
**Application**: Integration tests provide best ROI

## Testing Strategy for First User Story

### User Story: "Display Personal Routes"

**As a** user  
**I want to** see my personal routes with nicknames  
**So that** I can quickly identify my routine journeys

### Test Coverage (2 Tests)

#### 1. Domain Test: PersonalRoute Entity

```typescript
// src/domain/entities/__tests__/PersonalRoute.test.ts
describe("PersonalRoute Entity", () => {
  it("should create valid personal route with metadata", () => {
    // Tests core business logic
    // Validates entity constraints with nickname, frequency, favorite
    // Documents domain rules for personal context
  });
});
```

**Justification**: Core business logic with personal context, documents domain rules, catches critical errors

#### 2. Integration Test: API to Screen

```typescript
// src/presentation/screens/__tests__/PersonalRoutes.integration.test.tsx
describe("Personal Routes Screen Integration", () => {
  it("should fetch and display personal routes with metadata", async () => {
    // Tests complete flow with personal context
    // Validates data transformation from Journey to PersonalRoute
    // Ensures UI renders nicknames, favorites, frequency badges
  });
});
```

**Justification**: Tests critical path, validates entire feature with personal context works end-to-end

### What We're NOT Testing (And Why)

#### Skipped: Repository Implementation

**Why Skip**: TypeScript ensures contract, implementation is straightforward fetch

#### Skipped: Mapper Functions

**Why Skip**: Pure transformation functions, TypeScript validates types

#### Skipped: Individual UI Components

**Why Skip**: Covered by integration test, visual testing more valuable

#### Skipped: Use Case Classes

**Why Skip**: Thin orchestration layer, logic tested via integration

## ROI Analysis

### High ROI (We Test)

- **Domain Logic**: Business rules, core value
- **Integration Points**: Where most bugs occur
- **Critical User Paths**: Must work for app to be useful

### Low ROI (We Skip)

- **Trivial Code**: Getters, setters, simple mappings
- **Framework Code**: React Native, React Query handle this
- **Type-Safe Code**: TypeScript catches these errors

## Testing Pyramid for This Project

```
        /\
       /E2E\      (0 tests - Manual testing sufficient)
      /------\
     /  Integ  \   (1 test - Critical path)
    /------------\
   /     Unit     \ (1 test - Domain logic)
  /----------------\
```

Traditional pyramid: 70% unit, 20% integration, 10% E2E  
Our pyramid: 50% unit, 50% integration, 0% E2E (manual)

## Progression Strategy

### Phase 1: MVP (Current)

- 2 tests per feature
- Focus on learning React Native
- Manual testing for UI

### Phase 2: Stable Features

- Add tests when bugs found
- Test complex business logic
- Consider snapshot tests

### Phase 3: Production Ready

- Increase coverage to ~60%
- Add E2E for critical flows
- Performance testing

## Decision Framework

### When to Write a Test

✅ Complex business logic  
✅ Bug regression prevention  
✅ Behavior documentation  
✅ Integration boundaries

### When to Skip a Test

❌ Trivial transformations  
❌ Framework functionality  
❌ Type-checked code  
❌ Temporary/experimental code

## Conclusion

For a senior backend developer learning React Native, **2 tests per feature** provides the optimal balance:

1. **Sufficient Quality**: Catches critical bugs, documents intent
2. **Learning Velocity**: More time exploring React Native patterns
3. **Pragmatic ROI**: Tests where bugs likely, skips obvious code
4. **Professional Judgment**: Leverages existing experience

This approach acknowledges that:

- TypeScript eliminates entire categories of tests
- Senior developers have good instincts about what needs testing
- Personal projects benefit from rapid iteration
- Testing can be increased when patterns stabilize

## References

1. Taylor, J. (2023). Clean Architecture Solution Template
2. Manguinho, R. (2022). Clean React Native Architecture
3. Martin, R. C. (2017). Clean Architecture: A Craftsman's Guide
4. Beck, K. (2002). Test-Driven Development by Example
5. Dodds, K. C. (2020). "Write tests. Not too many. Mostly integration."
6. Fowler, M. (2021). "Testing Pyramid" - martinfowler.com

## Final Recommendation

**Start with 2 tests, add more when you feel fear, stop when you feel boredom.**

This wisdom from Kent Beck perfectly captures the pragmatic approach for experienced developers: trust your instincts, test what matters, ship working software.
