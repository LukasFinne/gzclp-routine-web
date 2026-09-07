import { useState, useTransition } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { DocumentId, WorkoutData } from "../../../lib/workout/types";
import { Button } from "../../../components/ui/button";
import { upload } from "../api/upload.ts";

interface UploadButtonProps {
  userId: string;
  currentDay: DocumentId;
  workout: WorkoutData;
}

export const UploadButton = ({
  userId,
  workout,
  currentDay,
}: UploadButtonProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const handleUpload = () => {
    startTransition(async () => {
      setError(null);
      const result = await upload(userId, workout, currentDay);
      if (result.isSuccess) {
        await navigate({ to: "/" });
      } else {
        setError(result.message ?? "Failed to upload");
      }
    });
  };
  return (
    <>
      <form
        action={handleUpload}
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
        {error && (
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
            <span>{error}</span>
          </div>
        )}
      </form>
    </>
  );
};
