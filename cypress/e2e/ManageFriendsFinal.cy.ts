describe("Gérer sa liste d'amis", () => {
  it('passes', () => {
    cy.connect('marine0023')

    cy.get('#NavDiscover').click()
    cy.contains('Profiles').click()

    cy.contains('div', 'Titi').parent().within(() => {
      cy.get('Button').click();
    });

    cy.contains('div', 'Front End').parent().within(() => {
      cy.get('Button').click();
    });

    cy.disconnect()

    cy.get('#Login').type('titi_le_belge')
    cy.get('#Password').type('Strong#1{enter}')

    cy.get('#NavDiscover').click()
    cy.contains('Profiles').click()

    // Accept Marin's friend request
    cy.contains('Marine').click()
    cy.contains('Accept Friend Request').click()

    cy.disconnect()

    cy.get('#Login').type('frontend_champ')
    cy.get('#Password').type('Strong#1{enter}')

    cy.get('#NavDiscover').click()
    cy.contains('Profiles').click()

    cy.contains('Marine').click()
    cy.contains('Accept Friend Request').click()

    cy.disconnect()

    cy.get('#Login').type('marine0023')
    cy.get('#Password').type('Strong#1{enter}')

    cy.get('#NavDiscover').click()
    cy.contains('Profiles').click()

    cy.contains('div', 'Titi').parent().within(() => {
      cy.get('Button').click();
    });

    cy.contains('div', 'Front End').parent().within(() => {
      cy.get('Button').click();
    });
  })
})
