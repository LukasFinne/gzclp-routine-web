import type { State } from "../reducer.ts";
import type {
  DocumentId,
  Stage,
  Tier1And2Exercise,
  Tier3Exercise,
  TierExerciseData,
  UserDoc,
  WorkoutData,
} from "../../../../lib/workout/types.ts";
import { type Protocol, TierOneProtocols, TierTwoProtocols } from "../types.ts";

export const getStageFromProtocol = (
  tier: "tier1" | "tier2",
  protocol: Protocol,
): Stage => {
  if (tier === "tier1") {
    if (
      protocol.set === TierOneProtocols[1].set &&
      protocol.reps === TierOneProtocols[1].reps
    )
      return 1;
    if (
      protocol.set === TierOneProtocols[2].set &&
      protocol.reps === TierOneProtocols[2].reps
    )
      return 2;
    if (
      protocol.set === TierOneProtocols[3].set &&
      protocol.reps === TierOneProtocols[3].reps
    )
      return 3;
    return 1;
  }

  if (
    protocol.set === TierTwoProtocols[1].set &&
    protocol.reps === TierTwoProtocols[1].reps
  )
    return 1;
  if (
    protocol.set === TierTwoProtocols[2].set &&
    protocol.reps === TierTwoProtocols[2].reps
  )
    return 2;
  if (
    protocol.set === TierTwoProtocols[3].set &&
    protocol.reps === TierTwoProtocols[3].reps
  )
    return 3;

  return 1;
};

const getTier1Or2ExerciseData = (
  state: State,
  exerciseName: Tier1And2Exercise,
  tier: "tier1" | "tier2",
): TierExerciseData => {
  const protocolEntry = state.protocols.tierOneAndTwo.find(
    (item) => item.name === exerciseName,
  );
  const protocol =
    protocolEntry?.protocol[tier] ??
    (tier === "tier1" ? TierOneProtocols[1] : TierTwoProtocols[1]);
  const stage = getStageFromProtocol(tier, protocol);
  const weight = state.exercises[exerciseName];

  return {
    exercise: exerciseName,
    set: protocol.set,
    reps: protocol.reps,
    stage,
    weight,
  };
};

const getTier3ExerciseData = (
  state: State,
  exerciseName: Tier3Exercise,
): TierExerciseData => {
  const protocolEntry = state.protocols.tierThree.find(
    (item) => item.name === exerciseName,
  );
  const protocol = protocolEntry?.protocol ?? { set: 3, reps: 15 };
  const weight = state.exercises[exerciseName];

  return {
    exercise: exerciseName,
    set: protocol.set,
    reps: protocol.reps,
    stage: 1,
    weight,
  };
};

export const mapWorkoutDay = (dayId: DocumentId, state: State): WorkoutData => {
  switch (dayId) {
    case "A1":
      return {
        day: "Squat",
        tier1: getTier1Or2ExerciseData(state, "Squat", "tier1"),
        tier2: getTier1Or2ExerciseData(state, "Bench", "tier2"),
        tier3: getTier3ExerciseData(state, "Lat pulldown"),
      };
    case "B1":
      return {
        day: "OHP",
        tier1: getTier1Or2ExerciseData(state, "OHP", "tier1"),
        tier2: getTier1Or2ExerciseData(state, "Deadlift", "tier2"),
        tier3: getTier3ExerciseData(state, "Dumbell row"),
      };
    case "A2":
      return {
        day: "Bench",
        tier1: getTier1Or2ExerciseData(state, "Bench", "tier1"),
        tier2: getTier1Or2ExerciseData(state, "Squat", "tier2"),
        tier3: getTier3ExerciseData(state, "Lat pulldown"),
      };
    case "B2":
      return {
        day: "Deadlift",
        tier1: getTier1Or2ExerciseData(state, "Deadlift", "tier1"),
        tier2: getTier1Or2ExerciseData(state, "OHP", "tier2"),
        tier3: getTier3ExerciseData(state, "Dumbell row"),
      };
  }
};

export const mapStateToUserDoc = (state: State): UserDoc => {
  return {
    currentWorkout: state.workOutDay,
    workouts: {
      A1: mapWorkoutDay("A1", state),
      B1: mapWorkoutDay("B1", state),
      A2: mapWorkoutDay("A2", state),
      B2: mapWorkoutDay("B2", state),
    },
  };
};
