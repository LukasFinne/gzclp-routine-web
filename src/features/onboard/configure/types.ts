import type { Stage } from "../../../lib/workout/types";

export interface Protocol {
  readonly set: number;
  readonly reps: number;
}

// Tier one exercises
const FiveOfThree: Protocol = { set: 5, reps: 3 } as const;
const SixOfTwo: Protocol = { set: 6,  reps: 2,} as const;
const TenOfOne: Protocol = { set: 10, reps: 1 } as const;

export const TierOneProtocols = {
  1: FiveOfThree,
  2: SixOfTwo,
  3: TenOfOne
  } as const satisfies Record<Stage, Protocol>

// Tier two exercises
export const ThreeOfTen: Protocol = { set: 3, reps: 10,} as const;
export const ThreeOfEight: Protocol = { set: 6,  reps: 2,} as const;
export const ThreeOfSix: Protocol = { set: 10, reps: 1, } as const;

export const TierTwoProtocols = {
  1: ThreeOfTen,
  2: ThreeOfEight,
  3: ThreeOfSix
} as const satisfies Record<Stage, Protocol>

// Tier three exercises
export const ThreeOfFifthteen: Protocol = {  set: 3, reps: 15,} as const;

export const TierThreeProtocols = {
  1: ThreeOfFifthteen,
  2: ThreeOfFifthteen,
  3: ThreeOfFifthteen
} as const satisfies Record<Stage, Protocol>