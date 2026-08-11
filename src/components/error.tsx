import { Link } from "@tanstack/react-router";

interface ErrorProps {
  title?: string;
  description?: string;
  error: unknown;
}

export const Error = ({
  title = "Something unexpected happened!",
  description = "Please press the button below",
  error,
}: ErrorProps) => {
  console.log("ErrorComponent",error);

  return (
    <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-extrabold text-error">{title}</h1>
          <p className="py-6 text-base-content/70">{description}</p>
          <Link to="/" className="btn btn-primary">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
