describe('Poster une publication', () => {
  it('passes', () => {
    cy.connect('martin_p')

    cy.get("#NavCreatePub").click()
    cy.wait(500)
    cy.get("input[type=file]").selectFile("cypress\\downloads\\bg.png")
    cy.get("input[type=text]").type("Sacré plaque !")
    cy.contains("Publish").click()

    cy.get("#NavCreatePub").click()
    cy.wait(500)
    cy.get("input[type=file]").selectFile("cypress\\downloads\\fish.png")
    cy.get("input[type=text]").type("Serious business")
    cy.contains("Publish").click()
  })
})
