_Partially written with gemini_

_Work in progress_

# GZCLP Workout Tracker

A website for tracking the **GZCLP Linear Progression** strength training program. I built this for personal usage to help me track my progression.

---

## 🚀 Key Features

- **GZCLP Progression**: Automated state machine managing weight increases on success (+5kg for Squat/Deadlift, +2.5kg for Bench/OHP) and program adjustments (reps/sets stages) on failure, down to the 85% reset stage.
- **Real-Time Data Syncing**: Direct integration with Firebase Cloud Firestore using active snapshot listeners to ensure cross-device consistency and instantaneous UI updates.
- **Type-Safe Routing**: Powered by TanStack Router for route protection (auth gates), type-safe navigation, and robust loader states.
- **Modern Responsive UI**: Crafted with React 19, Tailwind CSS v4, and DaisyUI v5, featuring an engaging, mobile-first design optimized for gym environments.
- **Test-Driven Design**: Core workouts, workout schedules, and state progression logic are fully covered with unit tests using Vitest.

---

## 🛠️ Technology Stack

- **Frontend**: [React 19](https://react.dev/) & [TypeScript 6](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Routing**: [TanStack React Router](https://tanstack.com/router/latest)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [DaisyUI v5](https://daisyui.com/)
- **Backend & Database**: [Firebase](https://firebase.google.com/) (Authentication & Firestore)
- **Validation**: [Zod](https://zod.dev/)
- **Testing**: [Vitest](https://vitest.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/)

---

## ⚙️ Development Setup

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd gzclp-project
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Open the newly created `.env` file and insert your Firebase credentials.

### Running the App

Start the Vite development server locally:

```bash
pnpm dev
```

By default, the application will run at `http://localhost:5173`.

### Running Tests

Execute the Vitest test suite to verify progression engine logic:

```bash
pnpm test
```
