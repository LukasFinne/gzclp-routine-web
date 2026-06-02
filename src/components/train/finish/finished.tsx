import { useActionState } from "react";
import type { WorkoutData } from "../../../lib/workout/workout";
import { Button } from "../../button";
import { finishAction } from "./finishAction";
import { useUser } from "../../../lib/hooks";


interface FinishedProps {
 data: WorkoutData
}

export const Finished = ({ data }: FinishedProps) => {
  const user = useUser()
  const [actionState, dispatch, isPending] = useActionState(finishAction.bind(null, {user: user, data: data}),{isSuccess: false})
  
  return (
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">
        Good work! {actionState.isSuccess}
      </h1>
      <p>{actionState.message}</p>
      <ul className="py-6">
        <li>Update your weight and protcol by clicking the button below</li>
      </ul>
      <form action={dispatch} className="w-full space-x-4 ">
        <Button
          type="submit"
          disabled={isPending}
          className="btn btn-primary btn-xl sm:btn-md"
        >
          {isPending ? "Finishing..." : "Finish"}
        </Button>
      </form>
    </div>
  );
};
