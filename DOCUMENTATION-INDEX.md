# Documentation Index - Public Transports Projects

## 📱 React Native Mobile App (Current Directory)

**Location**: `/home/florent/personal-dev/public-transports/PublicTransports/`
**Status**: 🚧 Clean Architecture complete, blocked on backend implementation

### Core Documentation

- **[ROADMAP.md](./ROADMAP.md)** - 🚨 **READ FIRST** - Complete implementation plan, current status, and next steps
- **[CLAUDE.md](./CLAUDE.md)** - ✅ Development guide for Claude Code

### Strategic Documentation

- **[PROJECT-VISION.md](./PROJECT-VISION.md)** - ✅ Personal transport assistant vision (long-term)
- **[TESTING-STRATEGY.md](./TESTING-STRATEGY.md)** - ✅ Pragmatic testing approach (2 tests per feature)
- **[VISION_CHALLENGE_GPT5.md](./VISION_CHALLENGE_GPT5.md)** - 📝 Vision refinement and challenges (defer)

### Quick Reference

- **[README.md](./README.md)** - ✅ Quick start guide
- **[AGENTS.md](./AGENTS.md)** - ✅ Claude agent quick reference

## 🌐 React Web App (Working Reference)

**Location**: `/home/florent/personal-dev/public-transports/public-transport-front/`
**Status**: ✅ Working production app - DO NOT TOUCH

- **[README.md](../public-transport-front/README.md)** - Basic project info
- **[ARCHITECTURE.md](../public-transport-front/ARCHITECTURE.md)** - Clean architecture design and evolution plan
- **Technology**: React, TypeScript, Vite, TailwindCSS
- **API Integration**: Kubb with React Query (auto-generated from OpenAPI)
- **Current API**: Uses Journey endpoints successfully

### Key Implementation Details

- Uses Kubb to generate types and hooks from https://public-transports-back.fly.dev/v3/api-docs
- Implements Journey list and detail views
- Has domain mapping layer (`src/services/toDomain.ts`)
- Uses React Query for state management

## ⚙️ Spring Boot Backend API

**Location**: `/home/florent/personal-dev/public-transports/public-transports-back/`
**Status**: ⚠️ Journey API works, PersonalRoute implementation MISSING

- **[specs.yaml](../public-transports-back/adapter-rest/src/main/resources/specs.yaml)** - ✅ OpenAPI specification (PersonalRoute defined)
- **Java Implementation**: ❌ PersonalRoute controllers/services/repositories NOT IMPLEMENTED

## 🔗 API Status

| API           | Spec        | Implementation | Live Endpoints                                     | Used By                 |
| ------------- | ----------- | -------------- | -------------------------------------------------- | ----------------------- |
| Journey       | ✅ Complete | ✅ Working     | ✅ https://public-transports-back.fly.dev/journeys | React Web App           |
| PersonalRoute | ✅ Complete | ❌ **MISSING** | ❌ 404 Not Found                                   | 🚧 Blocked React Native |

### Live API Resources

- **API Docs**: https://public-transports-back.fly.dev/v3/api-docs
- **Swagger UI**: https://public-transports-back.fly.dev/swagger-ui.html
- **Working Journey API**: https://public-transports-back.fly.dev/journeys
- **Missing PersonalRoute API**: https://public-transports-back.fly.dev/routes/personal (404)

## 🎯 Quick Navigation

**Current Working Directory**: `/home/florent/personal-dev/public-transports/PublicTransports/`

### Related Projects

- **Backend**: `../public-transports-back/` (JAVA WORK NEEDED HERE)
- **Working Web App**: `../public-transport-front/` (REFERENCE ONLY)
- **Parent Directory**: `../`

## 🚨 Critical Path

1. **FIRST**: Implement Java backend PersonalRoute (see ROADMAP.md)
2. **THEN**: Deploy and verify endpoints work
3. **FINALLY**: Proceed with React Native integration

**Key Files to Read Next**:

1. [ROADMAP.md](./ROADMAP.md) - Complete implementation plan with current status and immediate actions
