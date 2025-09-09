# Documentation Index - Public Transports Projects

## React Native Mobile App

**Location**: `/home/florent/personal-dev/public-transports/claude-react-native/PublicTransports/`

- **[CLAUDE.md](./CLAUDE.md)** - Development guide for Claude Code
- **[README.md](./README.md)** - Quick start guide
- **[PROJECT-VISION.md](./PROJECT-VISION.md)** - Personal transport assistant vision
- **[ROADMAP.md](./ROADMAP.md)** - Development roadmap and current tasks
- **[TESTING-STRATEGY.md](./TESTING-STRATEGY.md)** - Pragmatic testing approach (2 tests per feature)

## React Web App (Reference Implementation)

**Location**: `/home/florent/personal-dev/public-transports/front/ui-first-try/`

- **[README.md](../../../front/ui-first-try/README.md)** - Basic project info
- **[ARCHITECTURE.md](../../../front/ui-first-try/ARCHITECTURE.md)** - Clean architecture design and evolution plan
- **Technology**: React, TypeScript, Vite, TailwindCSS
- **API Integration**: Kubb with React Query (auto-generated from OpenAPI)
- **Status**: ✅ Working app using Journey API

### Key Implementation Details

- Uses Kubb to generate types and hooks from https://public-transports-back.fly.dev/v3/api-docs
- Implements Journey list and detail views
- Has domain mapping layer (`src/services/toDomain.ts`)
- Uses React Query for state management

## Spring Boot Backend API

**Location**: `/home/florent/personal-dev/public-transports/public-transports-back/`

- **[domain-model.md](../../../public-transports-back/docs/domain-model.md)** - Domain entities and relationships
- **[nosql-schema.md](../../../public-transports-back/docs/nosql-schema.md)** - NoSQL database schema
- **[specs.yaml](../../../public-transports-back/adapter-rest/src/main/resources/specs.yaml)** - OpenAPI specification

## API Endpoints

- **Live API**: https://public-transports-back.fly.dev
- **API Docs**: https://public-transports-back.fly.dev/v3/api-docs
- **Swagger UI**: https://public-transports-back.fly.dev/swagger-ui.html

## Quick Links

- **Backend Repo**: `/home/florent/personal-dev/public-transports/public-transports-back/`
- **React Native App**: `/home/florent/personal-dev/public-transports/claude-react-native/PublicTransports/`
- **React Web App**: `/home/florent/personal-dev/public-transports/front/ui-first-try/`
- **Parent Directory**: `/home/florent/personal-dev/public-transports/`
