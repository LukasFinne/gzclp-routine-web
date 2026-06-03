import type { protocol, Stage } from "../../../lib/workout/protocol";

const protocol_t2_1: protocol = {
  reps: 10,
  set: 3,
  stage: 1
};
const protocol_t2_2: protocol = {
  reps: 8,
  set: 3,
  stage: 2
};
const protocol_t2_3: protocol = {
  reps: 6,
  set: 3,
  stage: 3
};

export const t2_protocols = new Map<Stage, protocol>([
  [1, protocol_t2_2],
  [2, protocol_t2_3],
  [3, protocol_t2_1],
]);

