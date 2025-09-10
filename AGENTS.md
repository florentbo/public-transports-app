AGENTS QUICK REF (Keep ~20 lines max)

1. Core Commands: dev `npm start`; android/ios/web; lint `npm run lint`; types `npm run typecheck`; full `npm run validate`; fast `npm run validate:quick`.
2. Tests: all `npm test`; watch; coverage; single file `npx jest path/to/File.test.ts`; name `npx jest -t "name"`.
3. Single Example: `npx jest src/domain/entities/__tests__/Stop.test.ts -t "distance"`.
4. Architecture: Presentation → Application → Domain (pure) + Infrastructure impl; no outward (domain) imports.
5. Aliases: `@/domain|infrastructure|application|presentation/*`, root `@/*` (tsconfig + jest).
6. Imports: Node/3rd, Expo/React, domain/application, infrastructure, presentation/UI, relative; grouped; no domain default exports.
7. Types: TS strict; explicit public params/returns; local inference ok; prefer `readonly`; discriminated unions over enums.
8. Naming: PascalCase (types/components/entities/use cases), camelCase (vars/functions), UPPER_SNAKE (true constants).
9. Errors: Throw `Error` (future typed/Result); never swallow; UI handles via React Query errors.
10. Styling: No inline styles (warn), no unused StyleSheet entries; forbid gap/backdropFilter/boxShadow; use shadow\* props.
11. Text: Wrap user-visible text in `ThemedText` (ESLint enforced).
12. Domain Logic: Calculations in entities (e.g. `Stop.distanceFrom`); UI stays presentational.
13. Testing: `__tests__` or `*.test.ts(x)`; mock only repositories; target ~80% coverage.
14. React Query: Stable keys (`["nearbyStops", lat, lon, radius]`); `staleTime` 5m; avoid manual cache mutation.
15. Formatting: Prettier via lint-staged; don’t fight output; fix before commit.
16. Commits: `type(scope?): description` (feat/fix/docs/style/refactor/test/chore); explain WHY.
17. Pre-commit: Husky runs ESLint (fix), Prettier, typecheck, tests; do not bypass.
18. Avoid: circular deps, unintended `export *`, infra imports directly in presentation (use application service).
19. DI: Add repos/use cases only via `TransportService` (swap mocks later).
20. Cross-Project Docs: See `DOCUMENTATION-INDEX.md`, `CLAUDE.md`, `TESTING-STRATEGY.md` for broader & multi-repo context.
