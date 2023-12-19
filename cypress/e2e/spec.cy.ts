describe('My First Test', () => {
  it('Overview', () => {
    cy.visit('http://localhost:4200/')
    cy.get('#Login').type('marine0023')
    cy.get('#Password').type('Strong#1{enter}')
    cy.get('#Profile').click()
    cy.get("#ChangeProfilePicture").click()
    cy.get('input[type=file]').selectFile('C:\\Users\\adri9\\Pictures\\Screenshots\\bg.png')
    cy.contains('Submit').click()

  })
})
