import type { Protocol, Stage } from "../../../lib/workout/protocol";

const protocol_t3_1: Protocol = {
  reps: 15,
  set: 3,
  stage: 1
};


export const t3_protocols = new Map<Stage, Protocol>([
  [1, protocol_t3_1],
  [2, protocol_t3_1],
  [3, protocol_t3_1],
]);

