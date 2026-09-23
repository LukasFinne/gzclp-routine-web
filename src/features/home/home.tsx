import { Link } from "@tanstack/react-router";
import { WelcomeTitle } from "./welcomeTitle";

const PlayIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
);

const DumbbellIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="m6.5 6.5 11 11" />
    <path d="m21 21-1-1" />
    <path d="m3 3 1 1" />
    <path d="m18 22 4-4" />
    <path d="m2 6 4-4" />
    <path d="m3 10 7-7" />
    <path d="m14 21 7-7" />
  </svg>
);

const CalendarIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const LayersIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const TrendingUpIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const CheckCircleIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export const Home = () => {
  return (
    <div className="flex flex-col items-center w-full px-4 py-8 md:py-12 space-y-12 max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="hero w-full">
        <div className="hero-content text-center flex-col max-w-3xl p-0">
          <WelcomeTitle />
          <p className="pt-4 pb-6 text-base sm:text-lg text-base-content/80 max-w-2xl leading-relaxed">
            The proven 3-tier linear progression powerlifting method. Simple,
            structured, and designed to continuously push your Squat, Bench
            Press, Deadlift, and Overhead Press to new personal records.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/workout"
              className="btn btn-primary btn-lg shadow-md gap-2 px-8"
            >
              <PlayIcon className="w-5 h-5" />
              Start Workout
            </Link>
            <Link to="/workout" className="btn btn-outline btn-lg gap-2">
              <DumbbellIcon className="w-5 h-5" />
              Continue Training
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="w-full flex justify-center">
        <div className="stats stats-vertical sm:stats-horizontal shadow-md bg-base-100 border border-base-300/80 rounded-box w-full max-w-4xl">
          <div className="stat">
            <div className="stat-figure text-primary">
              <CalendarIcon />
            </div>
            <div className="stat-title font-medium">Routine Split</div>
            <div className="stat-value text-primary">4 Days</div>
            <div className="stat-desc font-medium">A1, B1, A2, B2 Workouts</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <LayersIcon />
            </div>
            <div className="stat-title font-medium">Training Hierarchy</div>
            <div className="stat-value text-secondary">3 Tiers</div>
            <div className="stat-desc font-medium">
              Base Strength, Volume, Prehab
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure text-accent">
              <TrendingUpIcon />
            </div>
            <div className="stat-title font-medium">Progression Scheme</div>
            <div className="stat-value text-accent">Linear</div>
            <div className="stat-desc font-medium">
              Dynamic rep cycles & deloads
            </div>
          </div>
        </div>
      </section>

      {/* 3-Tier Training Architecture */}
      <section className="w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="badge badge-primary badge-outline uppercase font-semibold text-xs tracking-wider">
            Methodology
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">
            The 3-Tier Training Architecture
          </h2>
          <p className="text-base-content/70 text-sm sm:text-base max-w-xl mx-auto">
            GZCLP balances intensity and volume across three distinct tiers to
            maximize strength gains while avoiding burnout.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {/* Tier 1 Card */}
          <div className="card bg-base-100 shadow-md border border-base-300 hover:border-primary/50 hover:shadow-xl transition-all">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <span className="badge badge-primary font-bold">Tier 1</span>
                <span className="text-xs font-semibold text-primary">
                  Core Strength
                </span>
              </div>
              <h3 className="card-title text-xl font-bold mt-1">
                Heavy Compound Lifts
              </h3>
              <div className="bg-primary/10 text-primary rounded-lg py-2 px-3 text-center font-mono font-bold text-sm">
                5×3+ ➔ 6×2+ ➔ 10×1+
              </div>
              <p className="text-sm text-base-content/70">
                Develops neuromuscular efficiency and maximum force production.
                The final set is an AMRAP (As Many Reps As Possible) to test
                progression.
              </p>
              <div className="divider my-1"></div>
              <ul className="text-xs text-base-content/70 space-y-1.5">
                <li className="flex items-center gap-1.5">
                  <CheckCircleIcon className="w-4 h-4 text-primary shrink-0" />
                  <span>Squat & Bench Press</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircleIcon className="w-4 h-4 text-primary shrink-0" />
                  <span>Deadlift & Overhead Press</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Tier 2 Card */}
          <div className="card bg-base-100 shadow-md border border-base-300 hover:border-secondary/50 hover:shadow-xl transition-all">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <span className="badge badge-secondary font-bold">Tier 2</span>
                <span className="text-xs font-semibold text-secondary">
                  Hypertrophy
                </span>
              </div>
              <h3 className="card-title text-xl font-bold mt-1">
                Supplemental Volume
              </h3>
              <div className="bg-secondary/10 text-secondary rounded-lg py-2 px-3 text-center font-mono font-bold text-sm">
                3×10 ➔ 3×8 ➔ 3×6
              </div>
              <p className="text-sm text-base-content/70">
                Moderate weight at higher volume builds muscular work capacity
                and reinforces lift mechanics under controlled fatigue.
              </p>
              <div className="divider my-1"></div>
              <ul className="text-xs text-base-content/70 space-y-1.5">
                <li className="flex items-center gap-1.5">
                  <CheckCircleIcon className="w-4 h-4 text-secondary shrink-0" />
                  <span>Cross-paired compound lifts</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircleIcon className="w-4 h-4 text-secondary shrink-0" />
                  <span>Reinforces technique and muscle mass</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Tier 3 Card */}
          <div className="card bg-base-100 shadow-md border border-base-300 hover:border-accent/50 hover:shadow-xl transition-all">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <span className="badge badge-accent font-bold">Tier 3</span>
                <span className="text-xs font-semibold text-accent">
                  Accessories
                </span>
              </div>
              <h3 className="card-title text-xl font-bold mt-1">
                Prehab & Endurance
              </h3>
              <div className="bg-accent/10 text-accent rounded-lg py-2 px-3 text-center font-mono font-bold text-sm">
                3×15+ AMRAP
              </div>
              <p className="text-sm text-base-content/70">
                Isolation exercises addressing muscular weak points, joint
                integrity, and muscle endurance without exhausting central
                recovery.
              </p>
              <div className="divider my-1"></div>
              <ul className="text-xs text-base-content/70 space-y-1.5">
                <li className="flex items-center gap-1.5">
                  <CheckCircleIcon className="w-4 h-4 text-accent shrink-0" />
                  <span>Lat Pulldowns & Dumbbell Rows</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircleIcon className="w-4 h-4 text-accent shrink-0" />
                  <span>Shoulders, arms & core support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Progression Steps Section */}
      <section className="w-full">
        <div className="card bg-base-100 shadow-md border border-base-300 p-6 md:p-8 w-full">
          <div className="text-center space-y-2 mb-6">
            <div className="badge badge-neutral badge-outline uppercase font-semibold text-xs tracking-wider">
              System Rules
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              How Progression Works
            </h2>
            <p className="text-base-content/70 text-sm max-w-xl mx-auto">
              Linear progression provides clear, objective rules for every
              workout session so you always know your next step.
            </p>
          </div>

          <ul className="steps steps-vertical md:steps-horizontal w-full py-2">
            <li className="step step-primary font-medium" data-content="1">
              <div className="text-left md:text-center mt-1">
                <p className="font-bold text-sm">Hit Target Reps</p>
                <p className="text-xs text-base-content/60">
                  Complete all sets and push final AMRAP
                </p>
              </div>
            </li>
            <li className="step step-primary font-medium" data-content="2">
              <div className="text-left md:text-center mt-1">
                <p className="font-bold text-sm">Add Weight</p>
                <p className="text-xs text-base-content/60">
                  +2.5kg Upper / +5kg Lower next time
                </p>
              </div>
            </li>
            <li className="step step-primary font-medium" data-content="3">
              <div className="text-left md:text-center mt-1">
                <p className="font-bold text-sm">Cycle Scheme</p>
                <p className="text-xs text-base-content/60">
                  On failure, switch to fewer reps & more sets
                </p>
              </div>
            </li>
            <li className="step step-primary font-medium" data-content="4">
              <div className="text-left md:text-center mt-1">
                <p className="font-bold text-sm">Deload & Reset</p>
                <p className="text-xs text-base-content/60">
                  Reset weight by 15% and break records
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Call To Action Card */}
      <section className="w-full">
        <div className="card bg-gradient-to-br from-base-100 via-base-100 to-base-200 shadow-xl border border-base-300 max-w-4xl mx-auto w-full">
          <div className="card-body items-center text-center p-8 md:p-10 space-y-3">
            <div className="badge badge-primary badge-outline text-xs uppercase font-bold tracking-widest">
              Ready For Today's Session?
            </div>
            <h2 className="card-title text-2xl md:text-3xl font-extrabold">
              Every Session Is a Step Toward New Records
            </h2>
            <p className="text-base-content/70 max-w-md text-sm md:text-base">
              Log your sets, follow your linear progression, and watch your
              numbers climb week after week.
            </p>
            <div className="card-actions pt-2">
              <Link
                to="/workout"
                className="btn btn-primary btn-wide btn-lg shadow-md gap-2"
              >
                <PlayIcon className="w-5 h-5" />
                Start Workout Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Attribution Footer */}
      <footer className="text-center pt-4 pb-2 text-xs text-base-content/50">
        <p>
          GZCLP Linear Progression Method developed by Cody Lefever. Built for
          lifters who value structured progress.
        </p>
      </footer>
    </div>
  );
};
