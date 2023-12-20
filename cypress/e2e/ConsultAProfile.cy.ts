describe('Consulter un profil', () => {
  it('passes', () => {
    cy.connect()

    cy.get("#NavDiscover").click()

    cy.contains("Profiles").click()

    cy.contains("Theo").click()

    cy.get('#BtnFriends').click()
  })
})
