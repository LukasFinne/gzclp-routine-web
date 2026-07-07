import { expect, test } from 'vitest'
import { rotateDay } from './workout'


test('Rotation of keys are correct order', () => {
  expect(rotateDay("A1")).toBe("B1")
  expect(rotateDay("B1")).toBe("A2")
  expect(rotateDay("A2")).toBe("B2")
  expect(rotateDay("B2")).toBe("A1")
})