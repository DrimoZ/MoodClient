describe('template spec', () => {
  it('passes', () => {
    cy.fixture('infos').then((infos) => {
      cy.visit(infos.website)

      cy.get('#GoToSignUp').click()

      cy.get('#Name').type("Martin Pecheur")
      cy.get('#Login').type("Martin le M")
      cy.get('#Password').type("weak")
      cy.get('#Mail').type("martinlem@martin.be")
      cy.get('#Birthdate').type("2006-06-10")
      cy.get('#PasswordConfirmation').type("weak")

      cy.Password("weak#")
      cy.Password("weak1")
      cy.Password("longweak#")
      cy.Password("strong#1")
      cy.Password("Strong#1")

      cy.get('#PasswordConfirmation').clear()
      cy.get('#PasswordConfirmation').type("Strong#1")

      cy.get('#BtnSignUp').click()

      cy.deleteMyAccount()

    })
  })
})
