describe('Aimer et commenter une publication', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/')
    cy.get('#Login').type('cestmoi')
    cy.get('#Password').type('Strong#1{enter}')

    cy.get('#NavNewsFeed').click()

    cy.get('#BtnLike').click()

    cy.get('#BtnComment').click()

    cy.get('#AddComment').type('Waw, Les poissons, ils ont tellement de charisme{enter}')

  })
})
