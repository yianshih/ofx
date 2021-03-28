export {}

describe("Get Quick Quote", () => {
  /**
   * Test for loading React Web App
   */
  it("Successfully loads", () => {
    cy.visit("/").as("loaded")
  })

  /**
   * Test for accessing to Quick Quote form
   */
  it("Click START QUOTING button", () => {
    cy.get(".startButton").click().as("startQuoting")
    cy.url().should("include", "quickQuote")
  })

  /**
   * Test for filling Quick Quote form and get result
   */
  it("Get Quote", () => {
    cy.visit("/").as("loaded")
    cy.get(".startButton").click().as("startQuoting")
    cy.url().should("include", "quickQuote")
    cy.get("#firstName").type("Yian")
    cy.get("#lastName").type("Shih")
    cy.get("#email").type("yiansh15@gmail.com")
    cy.get("#phone").type("431163567")
    
    cy.get("#fromCurrency").click() // Click From Currency Selector
    cy.get("#fromCurrency_AUD").click() // Click Option with id fromCurrency_AUD

    cy.get("#toCurrency").click()
    cy.get("#toCurrency_EUR").click()

    cy.get("#submitButton").click()

    // OFX Customer Rate should be visible if quick quote result has been fetched
    cy.contains("OFX Customer Rate").should("be.visible") 
  })
})
