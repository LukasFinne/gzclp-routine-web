import { useActionState } from "react";
import { Link } from "@tanstack/react-router";
import { useUser } from "../../../lib/hooks";
import type { DocumentId, WorkoutData } from "../../../lib/workout/types";
import { finishAction } from "../api/finishAction";
import { Button } from "../../../components/button";

interface UploadButtonProps {
  currentDay: DocumentId;
  workout: WorkoutData;
}

export const UploadButton = ({ workout, currentDay }: UploadButtonProps) => {
  const { user } = useUser();
  const [state, action, isPending] = useActionState(
    finishAction.bind(null, { user, data: { workout: workout, currentDay: currentDay} }),
    null,
  );

  return (
    <>
      {state?.isSuccess ? (
        <div className="flex flex-col items-center mt-6 gap-4">
          <div role="alert" className="alert alert-success alert-soft">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Workout uploaded successfully!</span>
          </div>
          <Link to="/" className="btn btn-primary">
            Go to Home
          </Link>
        </div>
      ) : (
        <form
          action={action}
          className="card-actions justify-center mt-6 w-full flex flex-col items-center gap-2"
        >
          <Button
            type="submit"
            style="btn btn-primary"
            disabled={isPending}
            className="w-full"
          >
            {isPending ? "Uploading..." : "Upload workout"}
          </Button>
          {state?.message && (
            <div role="alert" className="alert alert-error mt-4 text-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{state.message}</span>
            </div>
          )}
        </form>
      )}
    </>
  );
};
