import type { protocol, Stage } from "../../../lib/workout/protocol";

const protocol_t3_1: protocol = {
  reps: 15,
  set: 3,
  stage: 1
};


export const t3_protocols = new Map<Stage, protocol>([
  [1, protocol_t3_1],
  [2, protocol_t3_1],
  [3, protocol_t3_1],
]);

