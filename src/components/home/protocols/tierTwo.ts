import type { Protocol, Stage } from "../../../lib/workout/protocol";

const protocol_t2_1: Protocol = {
  reps: 10,
  set: 3,
  stage: 1
};
const protocol_t2_2: Protocol = {
  reps: 8,
  set: 3,
  stage: 2
};
const protocol_t2_3: Protocol = {
  reps: 6,
  set: 3,
  stage: 3
};

export const t2_protocols = new Map<Stage, Protocol>([
  [1, protocol_t2_2],
  [2, protocol_t2_3],
  [3, protocol_t2_1],
]);

