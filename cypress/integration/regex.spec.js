import {
  EMAIL_REGEX,
  INTEGER_REGEX,
  FLOAT_NUMBER_REGEX
} from "../../src/constant/regex"

describe("Test Regex", () => {
  it("Test Email Regex", () => {
    expect(EMAIL_REGEX.test("test@gmail.com")).to.equal(true)
  })
  
  it("Test Email Regex : test@gmail.c", () => {
    expect(EMAIL_REGEX.test("test@gmail.c")).to.equal(false)
  })

  it("Test Email Regex : 123@gmail.c", () => {
    expect(EMAIL_REGEX.test("123@gmail.c")).to.equal(false)
  })

  it("Test Integer Regex : 5", () => {
    expect(INTEGER_REGEX.test("5")).to.equal(true)
  })

  it("Test Integer Regex : -5", () => {
    expect(INTEGER_REGEX.test(-5)).to.equal(false)
  })

  it("Test Integer Regex : 10", () => {
    expect(INTEGER_REGEX.test(10)).to.equal(true)
  })

  it("Test Integer Regex : a", () => {
    expect(INTEGER_REGEX.test("a")).to.equal(false)
  })

  it("Test Float Number Regex : 0.5", () => {
    expect(FLOAT_NUMBER_REGEX.test(0.5)).to.equal(true)
  })

  it("Test Float Number Regex : -0.5", () => {
    expect(FLOAT_NUMBER_REGEX.test(-0.5)).to.equal(true)
  })

  it("Test Float Number Regex : 5", () => {
    expect(FLOAT_NUMBER_REGEX.test(5)).to.equal(true)
  })
})
