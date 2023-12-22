describe('Moderator Rights', () => {
  it('Delete an account', () => {
    cy.fixture('infos').then((infos) => {
      cy.visit(infos.website)
    })
    cy.get('#GoToSignUp').click()

    cy.get('#Name').type("Extremely toxic user")
    cy.get('#Login').type("ToxicUser")
    cy.get('#Mail').type("toxic@toxic.fr")
    cy.get('#Birthdate').type("2002-09-10")
    cy.Password("Strong#1")
    cy.get('#PasswordConfirmation').type("Strong#1")

    cy.get('#BtnSignUp').click()
    cy.wait(2000)

    cy.disconnect()

    cy.connect('akisekai')

    cy.get('#NavDiscover').click()
    cy.contains('Profiles').click()
    cy.contains('Extremely toxic user').click()

    cy.get('#DeleteThisUser').click()
    cy.contains('Proceed').click()
  })
})
