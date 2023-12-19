describe('Modifier mon image de profil', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/')
    cy.get('#Login').type('marine0023')
    cy.get('#Password').type('Strong#1{enter}')
    cy.get('#Profile').click()

    cy.get("#ChangeProfilePicture").click()
    cy.get('input[type=file]').selectFile('cypress\\downloads\\bg.png')
    cy.contains('Submit').click()

    cy.get("#ChangeProfilePicture").click()
    cy.get('input[type=file]').selectFile('cypress\\downloads\\fish.png')
    cy.contains('Submit').click()

    cy.get("#ChangeProfilePicture").click()
    cy.get('input[type=file]').selectFile('cypress\\downloads\\Goldorak.jpg')
    cy.contains('Submit').click()
  })
})
