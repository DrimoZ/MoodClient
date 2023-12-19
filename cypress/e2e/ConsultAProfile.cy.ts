describe('Consulter un profil', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/')
    cy.get('#Login').type('martinp')
    cy.get('#Password').type('Strong#1{enter}')

    cy.get("#NavDiscover").click()

    cy.contains("Profiles").click()

    cy.contains("Moi").click()

    cy.get('#BtnFriends').click()
  })
})
