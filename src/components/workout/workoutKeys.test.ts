import { expect, test } from 'vitest'
import { RotateWorkoutKey } from './workoutKeys'

test('Rotation of keys are correct order', () => {
  expect(RotateWorkoutKey("A1")).toBe("B1")
  expect(RotateWorkoutKey("B1")).toBe("A2")
  expect(RotateWorkoutKey("A2")).toBe("B2")
  expect(RotateWorkoutKey("B2")).toBe("A1")
})