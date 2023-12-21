describe('Modifier mon image de profil', () => {
  it('passes', () => {
    cy.connect('martin_p')

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
