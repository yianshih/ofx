import { EMAIL_REGEX, INTEGER_REGEX, FLOAT_NUMBER_REGEX } from "./regex"

describe("Test Regex", () => {
  test("Test Email Regex : test@gmail.com", () => {
    expect(EMAIL_REGEX.test("test@gmail.com")).toBe(true)
  })

  test("Test Email Regex : test@gmail.c", () => {
    expect(EMAIL_REGEX.test("test@gmail.c")).toBe(false)
  })

  test("Test Email Regex : 123@gmail.c", () => {
    expect(EMAIL_REGEX.test("123@gmail.c")).toBe(false)
  })

  test("Test Integer Regex : 5", () => {
    expect(INTEGER_REGEX.test("5")).toBe(true)
  })

  test("Test Integer Regex : -5", () => {
    expect(INTEGER_REGEX.test(-5)).toBe(false)
  })

  test("Test Integer Regex : 10", () => {
    expect(INTEGER_REGEX.test(10)).toBe(true)
  })

  test("Test Integer Regex : a", () => {
    expect(INTEGER_REGEX.test("a")).toBe(false)
  })

  test("Test Float Number Regex : 0.5", () => {
    expect(FLOAT_NUMBER_REGEX.test(0.5)).toBe(true)
  })

  test("Test Float Number Regex : -0.5", () => {
    expect(FLOAT_NUMBER_REGEX.test(-0.5)).toBe(true)
  })

  test("Test Float Number Regex : 5", () => {
    expect(FLOAT_NUMBER_REGEX.test(5)).toBe(true)
  })
})
