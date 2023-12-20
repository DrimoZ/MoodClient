describe('Changement de mot de passe', () => {
  it('passes', () => {
    cy.connect('marine0023')

    cy.parameters()

    //Fail
    cy.modifyPassword('Wrong', 'Stronger#2')

    cy.wait(1000)

    cy.get('#OldPassword').clear()
    cy.get('#NewPassword').clear()
    cy.get('#PasswordConfirmation').clear()

    //Fail
    cy.modifyPassword('Strong#1', 'weak#1')

    cy.wait(1000)

    cy.get('#OldPassword').clear()
    cy.get('#NewPassword').clear()
    cy.get('#PasswordConfirmation').clear()

    //Fail confirmation
    cy.get('#OldPassword').type('Strong#1')
    cy.get('#NewPassword').type('Stronger#2')
    cy.get('#PasswordConfirmation').type('wrong{enter}')

    cy.wait(1000)

    cy.get('#OldPassword').clear()
    cy.get('#NewPassword').clear()
    cy.get('#PasswordConfirmation').clear()

    //Confirmed
    cy.modifyPassword('Strong#1', 'Stronger#2')

    cy.wait(1000)

    //Confirmed
    cy.modifyPassword('Stronger#2', 'Strong#1')
  })
})
