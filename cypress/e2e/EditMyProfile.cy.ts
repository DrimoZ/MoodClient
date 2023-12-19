describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/')
    cy.get('#Login').type('martinp')
    cy.get('#Password').type('Strong#1{enter}')

    cy.get('#Profile').click()

    cy.contains('Account').click()
    cy.contains('Edit Account').click()

    cy.get('#InputFullName').clear()
    cy.get('#InputFullName').type('Adurian')
    cy.get('#InputEmail').clear()
    cy.get('#InputEmail').type('Adurian@gmail.com')
    cy.get('#InputBirthDate').clear()
    cy.get('#InputBirthDate').type('1999-04-11')
    cy.get('#InputTitle').clear()
    cy.get('#InputTitle').type('Ninja')
    cy.get('#InputDescription').clear()
    cy.get('#InputDescription').type('BAC+5 Ninja')

    cy.contains('Validate Changes').click()

    cy.contains('Edit Account').click()

    cy.get('#InputFullName').clear()
    cy.get('#InputFullName').type('Martin Pecheur')
    cy.get('#InputEmail').clear()
    cy.get('#InputEmail').type('yoplait@example.com')
    cy.get('#InputBirthDate').clear()
    cy.get('#InputBirthDate').type('1994-07-07')
    cy.get('#InputTitle').clear()
    cy.get('#InputTitle').type('Oui')
    cy.get('#InputDescription').clear()
    cy.get('#InputDescription').type('CEFUC 22')

    cy.contains('Validate Changes').click()
  })
})
