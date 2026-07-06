import { Link } from "@tanstack/react-router";

export const NotWorkoutData = () => {
  return (
    <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-extrabold text-error">
            No Data
          </h1>
          <p className="py-6 text-base-content/70">
            It seems you reached this page directly or did not complete a
            workout.
          </p>
          <Link to="/" className="btn btn-primary">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
