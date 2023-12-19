describe('Changement de mot de passe', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/')
    cy.get('#Login').type('marine0023')
    cy.get('#Password').type('Strong#1{enter}')

    cy.get('#Parameters').click()
    cy.get('#GoToParameters').click()

    //Fail
    cy.get('#OldPassword').type('Wrong')
    cy.get('#NewPassword').type('Stronger#2')
    cy.get('#PasswordConfirmation').type('Stronger#2{enter}')

    cy.wait(1000)

    cy.get('#OldPassword').clear()
    cy.get('#NewPassword').clear()
    cy.get('#PasswordConfirmation').clear()

    //Fail
    cy.get('#OldPassword').type('Strong#1')
    cy.get('#NewPassword').type('weak#1')
    cy.get('#PasswordConfirmation').type('weak#1{enter}')

    cy.wait(1000)

    cy.get('#OldPassword').clear()
    cy.get('#NewPassword').clear()
    cy.get('#PasswordConfirmation').clear()

    //Fail
    cy.get('#OldPassword').type('Strong#1')
    cy.get('#NewPassword').type('Stronger#2')
    cy.get('#PasswordConfirmation').type('wrong{enter}')

    cy.wait(1000)

    cy.get('#OldPassword').clear()
    cy.get('#NewPassword').clear()
    cy.get('#PasswordConfirmation').clear()

    //Confirmed
    cy.get('#OldPassword').type('Strong#1')
    cy.get('#NewPassword').type('Stronger#2')
    cy.get('#PasswordConfirmation').type('Stronger#2{enter}')

    cy.wait(1000)

    //Confirmed
    cy.get('#OldPassword').type('Stronger#2')
    cy.get('#NewPassword').type('Strong#1')
    cy.get('#PasswordConfirmation').type('Strong#1{enter}')

  })
})
