describe('Modifier mes informations de profil', () => {
  it('passes', () => {
    cy.connect('marine0023')

    cy.get('#Profile').click()

    cy.contains('Account').click()
    cy.contains('Edit Account').click()

    cy.get('#InputFullName').clear()
    cy.get('#InputFullName').type('Adurian')
    cy.get('#InputEmail').clear()
    cy.get('#InputEmail').type('Adurian@Ninja.com')
    cy.get('#InputBirthDate').clear()
    cy.get('#InputBirthDate').type('1999-04-11')
    cy.get('#InputTitle').clear()
    cy.get('#InputTitle').type('Ninja')
    cy.get('#InputDescription').clear()
    cy.get('#InputDescription').type('BAC+5 Ninja')

    cy.contains('Validate Changes').click()

    cy.contains('Edit Account').click()

    cy.get('#InputFullName').clear()
    cy.get('#InputFullName').type('Marine <3')
    cy.get('#InputEmail').clear()
    cy.get('#InputEmail').type('marine@defrance.fr')
    cy.get('#InputBirthDate').clear()
    cy.get('#InputBirthDate').type('1994-07-07')
    cy.get('#InputTitle').clear()
    cy.get('#InputTitle').type('Oui')
    cy.get('#InputDescription').clear()
    cy.get('#InputDescription').type('#Selfie')

    cy.contains('Validate Changes').click()
  })
})
