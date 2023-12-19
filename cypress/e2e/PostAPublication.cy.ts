describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/')
    cy.get('#Login').type('martinp')
    cy.get('#Password').type('Strong#1{enter}')

    cy.get("#NavCreatePub").click()
    cy.get("input[type=file]").selectFile("cypress\\downloads\\bg.png")
    cy.get("input[type=text]").type("Sacré plaque !")
    cy.contains("Publish").click()

    cy.get("#NavCreatePub").click()
    cy.get("input[type=file]").selectFile("cypress\\downloads\\fish.png")
    cy.get("input[type=text]").type("Serious business")
    cy.contains("Publish").click()
  })
})
