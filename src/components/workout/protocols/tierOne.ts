import type { protocol, Stage } from "../../../lib/workout/protocol";

const protocol_t1_1: protocol = {
  reps: 3,
  set: 5,
  stage: 1
};
const protocol_t1_2: protocol = {
  reps: 2,
  set: 6,
  stage: 2
};
const protocol_t1_3: protocol = {
  reps: 1,
  set: 10,
  stage: 3
};

export const t1_protocols = new Map<Stage, protocol>([
  [1, protocol_t1_2],
  [2, protocol_t1_3],
  [3, protocol_t1_1],
]);

