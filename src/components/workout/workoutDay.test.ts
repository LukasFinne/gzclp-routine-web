import { expect, test } from 'vitest'
import { RotateDay } from './workoutDay'

test('Rotation of keys are correct order', () => {
  expect(RotateDay("A1")).toBe("B1")
  expect(RotateDay("B1")).toBe("A2")
  expect(RotateDay("A2")).toBe("B2")
  expect(RotateDay("B2")).toBe("A1")
})