# Vision Challenge & Refinement (Personal Public Transport Assistant)

## 1. Executive Summary

The core insight—optimize for routine personal journeys instead of ad‑hoc trip planning—is strong but unproven. Competitive differentiation hinges on delivering trustworthy, low-noise proactive guidance (when to leave, reliable alternates) before investing in ML or social layers. Current documentation emphasizes long-term intelligence without first validating immediate user value or defining telemetry.

## 2. Strengths

- Sharp problem framing: routines dominate real usage.
- Clean Architecture + DDD foundation already present.
- Incremental phasing (foundation → intelligence → community).
- Deliberate minimal test strategy preserves early velocity.
- Separation of mock vs future real data pathways.

## 3. Core Challenges

- Differentiation risk: existing apps already have favorites/commute alerts.
- Cold start: no initial benefit before history accrues.
- Data realism: predictive features need actual vs scheduled + GTFS-RT (not planned yet).
- Naming overlap: Journey vs PersonalRoute unclear; risks conceptual debt.
- Battery/privacy concerns for passive route detection.
- Social layer premature without network liquidity.
- “Intelligence” undefined: no metrics for accuracy or utility.
- Minimal testing may miss data mapping / time logic regressions as complexity grows.

## 4. Domain Model Gaps

Missing explicit entities:

- PersonalRoute (user-curated canonical journey)
- JourneyObservation (single execution instance with timestamps + variance)
- Recommendation (action + confidence + rationale)
- ReliabilityStats (rolling aggregates per route + time bucket)
- ContextSnapshot (weather/events/disruptions at decision time)
  No event taxonomy to fuel learning loop.

## 5. Architectural Risks

- Single static `TransportService` will strain under per-user variants, background sync, and adaptive policies.
- Fixed React Query `staleTime` unsuitable for volatile feeds.
- Intelligence layer will later require time-series or aggregated storage; no abstraction yet.
- Early coupling of generated API types (Kubb) + renaming + platform shift increases friction.

## 6. Intelligence / ML Feasibility Reality

True “leave now” confidence requires:

1. Ingested historical punctuality + transfer success.
2. Real-time delay feeds.
3. Personal variance & preference modeling.
4. Defined on-time SLA (e.g., arrival within ±X minutes).
   Without these, “intelligence” devolves into naive schedule math + padding.

## 7. Suggested Strategic Refinements

| Phase                | Goal                            | What to Build                                           | What NOT to Build             |
| -------------------- | ------------------------------- | ------------------------------------------------------- | ----------------------------- |
| 0 Validation Sprint  | Prove utility of PersonalRoutes | Manual create/list, reorder, favorites, local storage   | Predictions, tracking, social |
| 1 Data Foundation    | Capture journeys & context      | Event schema, observation logging, reliability counters | ML models                     |
| 2 Heuristic Guidance | Basic “leave in N”              | Rolling median variance + configurable padding          | Probabilistic modeling        |
| 3 Predictive Layer   | Confidence scoring              | Time-bucket reliability, disruption adjustments         | Social + crowd layers         |
| 4 Social / Sharing   | Only if retention solid         | Opt-in ETA share, small contact-based                   | Open network/community feed   |

## 8. Alternative Hypotheses

- Real unmet need may be resilience under disruption (strike-aware fallback) not mere personalization.
- “Confidence + fallback in one glance” could outperform “personalization” as differentiator.
- Users may prefer minimal proactive nudges vs frequent alerts (opt-in threshold crucial).

## 9. Metrics & KPIs (Define Early)

- Activation: % users creating ≥2 PersonalRoutes day 1.
- Retention (W1/W4): Users with ≥1 PersonalRoute view per week.
- Recommendation Accuracy: Median |recommended_departure − required_departure|.
- Reliability Confidence: % journeys arriving within SLA window.
- Notification Utility: Action (open / acted) rate vs sent.
- Route Growth: Avg active PersonalRoutes per user over time.
- Churn Indicators: Routes deleted / deactivated ratio.

## 10. Event & Telemetry Schema (Initial Proposal)

Events (all include: `userId?`, `timestamp`, `platform`, `appVersion`):

- `personal_route_created { routeId }`
- `personal_route_viewed { routeId }`
- `journey_observed { routeId, plannedDeparture, actualDeparture, plannedArrival, actualArrival, segments, disruptionFlags[] }`
- `recommendation_generated { routeId, recType, recommendedDeparture, confidence, heuristicVersion }`
- `recommendation_accepted { routeId, deltaMinutes }`
- `recommendation_ignored { routeId }`
- `notification_sent { routeId, category, confidence }`
- `notification_opened { routeId, latencyMs }`
- `alternative_suggested { routeId, altId, reliabilityScoreDiff, durationDiff }`

Storage minimal counters:

- Rolling window (e.g. last 10 observations) lateness distribution.
- Time-of-day buckets (AM peak, Midday, PM peak, Evening).
- Context-adjusted penalty factors (weather, event).

## 11. Refined Domain Interfaces (Draft)

```typescript
interface PersonalRoute {
  id: string;
  nickname: string;
  origin: string; // Later: structured location
  destination: string;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface JourneyObservation {
  id: string;
  routeId: string;
  plannedDeparture: Date;
  actualDeparture?: Date;
  plannedArrival: Date;
  actualArrival?: Date;
  context: ContextSnapshot;
  disruptionFlags: string[];
}

interface Recommendation {
  id: string;
  routeId: string;
  recommendedDeparture: Date;
  rationale: string;
  confidence: number; // 0..1
  createdAt: Date;
  heuristicVersion: string;
}

interface ReliabilityStats {
  routeId: string;
  bucket: string; // e.g. "AM_PEAK"
  onTimeRatio: number;
  medianLatenessMinutes: number;
  sampleSize: number;
  updatedAt: Date;
}

interface ContextSnapshot {
  weather?: "rain" | "clear" | "hot" | "cold";
  eventFlags: string[];
  dayType: "weekday" | "weekend" | "holiday";
}
```

## 12. Incremental Intelligence Ladder

1. Static schedule + user-defined padding.
2. Rolling median lateness (per route).
3. Time-of-day bucket adjustments.
4. Context modifiers (add offset on rain or event).
5. Reliability-based alternative ranking (score = time − reliabilityPenalty).
6. Confidence scoring (prob. on-time).
7. Personalized variance modeling (user-specific vs global).
8. Multi-route tradeoff explanation (faster vs more reliable).

## 13. Risks & Mitigations

| Risk                           | Impact                 | Mitigation                                                 |
| ------------------------------ | ---------------------- | ---------------------------------------------------------- |
| Undifferentiated vs incumbents | Low adoption           | Narrow early promise: “Reliable leave time + fallback”     |
| Cold start emptiness           | Drop-off               | Onboarding wizard: create 2 routes immediately (templates) |
| Battery drain from GPS         | Uninstalls             | Use coarse/time-based checks first; significant-change API |
| Data sparsity for predictions  | Low accuracy           | Heuristics until sampleSize ≥ threshold                    |
| Alert fatigue                  | Disabled notifications | Confidence + cooldown gating                               |
| Over-inflated roadmap          | Slow delivery          | Introduce “Intelligence Readiness Checklist” gate          |
| Privacy concerns               | Trust erosion          | Local-first logs, anonymized aggregation, explicit toggles |

## 14. Testing Evolution Strategy

- Phase 0–1: Keep 2 tests (entity + integration).
- Add mapping test once API transforms journeys → personal routes.
- Add time calculation test once recommendation heuristics introduced.
- Introduce contract test (mock server) before real-time feeds.

## 15. Success Definition (Near-Term)

A feature-complete PersonalRoutes list + accurate “leave in N minutes” heuristic (median error ≤3 minutes on ≥10 observed journeys) that users consult ≥3 times/week without disabling notifications.

## 16. Immediate Action Plan

1. Glossary: Author a single-page domain terminology sheet (eliminate Journey/PersonalRoute ambiguity).
2. Event layer: Implement lightweight telemetry dispatcher (in-memory queue + console/log stub).
3. Local persistence: Store PersonalRoutes + last 10 observations (async storage / SQLite).
4. Heuristic v0: Rolling median lateness + simple “leave at scheduled − variance − userPadding”.
5. Metrics bootstrap: Log key KPIs to dev console to validate instrumentation flow.
6. Refactor naming in web + RN to unify (introduce PersonalRouteMapper for isolation).
7. Add minimal reliability badge (on-time %) to UI to test perceived value.

## 17. Open Questions Requiring Decisions

- Authentication timeline? (Local-only vs backend user IDs).
- Data feed provider & licensing for real-time (GTFS-RT path).
- On-time threshold definition (±2? ±5 minutes? adaptive?).
- Are multi-modal chains modeled now or deferred?
- API versioning approach for coexistence (e.g. `/v1/journeys`, `/v1/personal-routes`).

## 18. Defer / Explicitly Not Now

- ML models / embeddings.
- Social discovery & group commute.
- Crowd annotations.
- Advanced analytics dashboards.
- Offline intelligent caching beyond simple personal route list.

## 19. Readiness Checklist Before “Intelligence” Label

- ≥10 observations per active route.
- Time-of-day bucket stats stable (std deviation below threshold).
- <10% notification dismiss-without-open rate over week.
- Median recommendation error ≤ defined SLA.
- User has ≥2 routes marked favorite.

## 20. Closing

Anchor differentiation in reliable, context-aware departure guidance and fallback confidence—not in breadth of speculative “smart” features. Build the data spine (events, observations, reliability stats) early, then layer heuristics, then evolve toward predictive modeling only once empirical accuracy + user retention justify complexity.
