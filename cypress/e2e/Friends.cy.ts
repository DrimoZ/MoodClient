describe('Friends management', () => {
  it('Send friend requests', () => {
    cy.connect('marine0023')

    cy.get('#NavDiscover').click()
    cy.contains('Profiles').click()

    cy.contains('div', 'Titi').parent().within(() => {
      cy.get('Button').click();
    });

    cy.contains('div', 'Front End').parent().within(() => {
      cy.get('Button').click();
    });
  })

  it('Accept friend requests', () => {
    cy.connect('titi_le_belge')

    cy.get('#NavDiscover').click()
    cy.contains('Profiles').click()

    cy.contains('Marine').click()
    cy.contains('Accept Friend Request').click()

    cy.disconnect()

    cy.connect('frontend_champ')

    cy.get('#NavDiscover').click()
    cy.contains('Profiles').click()

    cy.contains('Marine').click()
    cy.contains('Accept Friend Request').click()

  });

  it('Delete friends', () => {
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
  });
});

describe('Chat with friends', () => {
  it('Create a group', () => {
    cy.get('#NavMessages').click()

  });

  it('Send a Real Time message', () => {

  });
})
