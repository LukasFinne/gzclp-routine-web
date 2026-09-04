export const Greeting = () => (
  <div className="flex flex-col items-center mb-6">
    <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>
    </div>
    <h1 className="text-4xl font-extrabold text-success tracking-tight">
      Workout Finished!
    </h1>
    <p className="mt-2 text-base-content/70">Great job!</p>
  </div>
);
