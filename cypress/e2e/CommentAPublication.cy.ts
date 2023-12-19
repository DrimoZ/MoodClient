describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/')
    cy.get('#Login').type('marine0023')
    cy.get('#Password').type('Strong#1{enter}')
  })
})
