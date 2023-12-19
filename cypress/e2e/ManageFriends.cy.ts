describe("Gérer sa liste d'amis", () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/')
    cy.get('#Login').type('marine0023')
    cy.get('#Password').type('Strong#1{enter}')

    cy.get('#NavDiscover').click()
    cy.contains('Profiles').click()

    cy.contains('div', 'Enghiennoise De Bruxelles').parent().within(() => {
      cy.get('Button').click();
    });

    cy.contains('div', 'Martin Pecheur').parent().within(() => {
      cy.get('Button').click();
    });

    // Disconnect
    cy.get('#Parameters').click()
    cy.contains('Disconnect').click()

    cy.get('#Login').type('martinp')
    cy.get('#Password').type('Strong#1{enter}')

    cy.get('#NavDiscover').click()
    cy.contains('Profiles').click()

    // Accept Marin's friend request
    cy.contains('Marine').click()
    cy.contains('Accept Friend Request').click()

    // Disconnect
    cy.get('#Parameters').click()
    cy.contains('Disconnect').click()

    cy.get('#Login').type('engh_bxl')
    cy.get('#Password').type('Strong#1{enter}')

    cy.get('#NavDiscover').click()
    cy.contains('Profiles').click()

    cy.contains('Marine').click()
    cy.contains('Accept Friend Request').click()

    // Disconnect
    cy.get('#Parameters').click()
    cy.contains('Disconnect').click()

    cy.get('#Login').type('marine0023')
    cy.get('#Password').type('Strong#1{enter}')

    cy.get('#NavDiscover').click()
    cy.contains('Profiles').click()

    cy.contains('div', 'Enghiennoise De Bruxelles').parent().within(() => {
      cy.get('Button').click();
    });

    cy.contains('div', 'Martin Pecheur').parent().within(() => {
      cy.get('Button').click();
    });
  })
})
