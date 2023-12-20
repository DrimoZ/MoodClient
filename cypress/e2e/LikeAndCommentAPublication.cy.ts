describe('Aimer et commenter une publication', () => {
  it('passes', () => {
    cy.connect()

    cy.get('#NavNewsFeed').click()

    cy.get('#BtnLike').click()

    cy.get('#BtnComment').click()

    cy.get('#AddComment').type('Waw, Les poissons, ils ont tellement de charisme{enter}')

  })
})
