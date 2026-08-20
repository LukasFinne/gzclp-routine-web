# React Project Architecture Guide (2026 Best Practices)

This guide documents the architecture, directory layout, and design conventions for the project using **React 19**, **TanStack Router**, **Vite**, **TypeScript**, and **Tailwind CSS**.

---

## 1. Core Principles

1. **Feature-First / Domain-Driven Colocation**:
   - Code is grouped primarily by **business domain / feature** (`src/features/*`), rather than by technical artifact type (e.g. putting all reducers in a root `reducers/` folder or all components in a generic `components/` folder).
   - Everything required for a feature (UI, state, API calls, pure utility logic, types, and unit tests) lives inside that feature's directory.

2. **Thin Route Orchestrators**:
   - Files in `src/routes/` are thin configuration wrappers.
   - Routes manage path parameters, route loaders, search param validation (Zod), and authentication guards (`beforeLoad`), delegating all UI rendering and business logic to feature modules.

3. **Strict Encapsulation via Feature Public API**:
   - Each feature exposes an `index.ts` barrel file defining its public interface.
   - Other features or routes should import only from `src/features/<feature>`, never directly reaching into internal subpaths.

4. **Pure Business Logic Isolation**:
   - Progression algorithms, weight calculations, and protocol mappings are pure, framework-agnostic TypeScript functions.
   - They can be tested with Vitest without mounting React components or DOM elements.

---

## 2. Directory Structure

```
src/
├── assets/                       # Static media, SVGs, brand assets
├── components/                   # Shared, domain-agnostic UI primitives only
│   ├── ui/                       # Reusable design system primitives
│   │   ├── button.tsx
│   │   ├── alert.tsx
│   │   ├── spinner.tsx
│   │   └── error-boundary.tsx
│   └── layout/                   # Global shell layouts
│       ├── header.tsx
│       └── app-layout.tsx
│
├── features/                     # Business domain modules
│   ├── auth/                     # Authentication & session management
│   │   ├── api/                  # Auth Firebase queries/mutations
│   │   ├── components/           # Login form, user menu
│   │   ├── hooks/                # useAuth, useSession
│   │   ├── types.ts
│   │   └── index.ts
│   │
│   ├── onboarding/               # Onboarding flow & initial setup
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── index.ts
│   │
│   └── workout/                  # Active workout execution & tracking
│       ├── api/                  # Firestore queries/mutations
│       │   ├── get-workout-day.ts
│       │   └── save-workout.ts
│       ├── components/           # Domain-specific UI
│       │   ├── tier-card.tsx
│       │   └── workout-session.tsx
│       ├── hooks/                # Custom hooks & state encapsulation
│       │   ├── use-workout-session.ts
│       │   ├── use-workout-session.test.ts
│       │   └── workout-reducer.ts
│       ├── utils/                # Pure business logic & algorithms
│       │   ├── protocol.ts
│       │   ├── protocol.test.ts
│       │   └── weight-calculator.ts
│       ├── types/                # Domain types & Zod schemas
│       │   └── workout.types.ts
│       └── index.ts              # Public API barrel
│
├── lib/                          # Third-party SDK client setups
│   ├── firebase.ts               # Firebase app & Firestore client
│   └── router.ts                 # Router instance & config
│
├── routes/                       # TanStack Router file-based routes
│   ├── __root.tsx                # App shell, context & global layout
│   ├── index.tsx                 # Home / dashboard page
│   ├── login.tsx                 # Login route
│   ├── onboard/
│   │   ├── index.tsx
│   │   └── configure.tsx
│   ├── workout/
│   │   └── index.tsx             # Auth guard + loader + mounts <WorkoutSession />
│   └── finish/
│       └── index.tsx             # Post-workout summary route
│
└── types/                        # Global app-wide types
```

---

## 3. Organizing State & Reducers (Alternatives to `model/`)

Rather than using a generic `model/` folder, choose one of these clean approaches based on your feature's complexity:

### A. Encapsulate in a Custom Hook (`hooks/`) — *(Recommended)*
Hide the raw `useReducer` and dispatch actions behind a clean, semantic hook API:

```
src/features/workout/hooks/
├── use-workout-session.ts       # Exposes semantic methods (e.g. markSuccess, markFailure)
├── use-workout-session.test.ts  # Hook integration test
└── workout-reducer.ts           # Pure reducer logic
```

**Example Implementation:**

```typescript
// src/features/workout/hooks/use-workout-session.ts
import { useReducer } from "react";
import type { WorkoutData } from "../types/workout.types";
import { workoutReducer } from "./workout-reducer";

export function useWorkoutSession(initialWorkout: WorkoutData) {
  const [state, dispatch] = useReducer(workoutReducer, {
    workoutData: initialWorkout,
    initialState: initialWorkout,
    activeTier: "tier1",
  });

  const markSuccess = () => dispatch({ type: "WORKOUT_ON_SUCCESS" });
  const markFailure = () => dispatch({ type: "WORKOUT_ON_FAILURE" });

  return {
    state,
    activeTier: state.activeTier,
    currentTierData: state.workoutData[state.activeTier],
    markSuccess,
    markFailure,
  };
}
```

### B. Dedicated `state/` or `store/` Directory
Ideal when using client stores (Zustand, Redux Toolkit) or when a feature has multiple reducers and action creators.

```
src/features/workout/state/
├── workout.reducer.ts
├── workout.reducer.test.ts
└── workout.actions.ts
```

### C. Flat Feature Layout
For compact features, keep the reducer directly at the feature root to prevent unnecessary folder nesting:

```
src/features/workout/
├── components/
├── api/
├── utils/
├── workout-reducer.ts
├── workout-reducer.test.ts
└── index.ts
```

---

## 4. Thin Route Pattern (TanStack Router)

Routes should remain lean (typically under 50 lines) by delegating responsibilities:

```tsx
// src/routes/workout/index.tsx
import { createFileRoute, Navigate, redirect, useRouteContext } from "@tanstack/react-router";
import { LoadingSpinner } from "../../components/ui/spinner";
import { WorkoutSession, getWorkoutDay } from "../../features/workout";

export const Route = createFileRoute("/workout/")({
  // 1. Auth Guard
  beforeLoad: ({ context }) => {
    if (!context.user && !context.isLoading) {
      throw redirect({
        to: "/login",
        search: { redirect: "/workout" },
      });
    }
  },

  // 2. Data Loader
  loader: async ({ context }) => {
    if (!context.user) return null;
    return await getWorkoutDay(context.user);
  },

  // 3. View Component
  component: WorkoutRouteView,
});

function WorkoutRouteView() {
  const { user, isLoading } = useRouteContext({ from: "/workout/" });
  const workoutData = Route.useLoaderData();

  if (isLoading || !user) {
    return <LoadingSpinner text="Loading your session..." />;
  }

  if (!workoutData) {
    return <Navigate to="/onboard" replace />;
  }

  return <WorkoutSession user={user} initialWorkout={workoutData} />;
}
```

---

## 5. Summary Checklist for New Code

- [ ] Is generic UI (buttons, dialogs, spinners) placed in `src/components/ui/`?
- [ ] Is domain-specific UI placed in `src/features/<feature>/components/`?
- [ ] Are route files in `src/routes/` thin orchestrators that delegate rendering to feature views?
- [ ] Are state transitions encapsulated inside feature hooks (`useWorkoutSession`) or `state/`?
- [ ] Is complex calculation logic kept pure in `utils/` with colocated `*.test.ts` files?
- [ ] Does the feature export a clean `index.ts` public interface?
