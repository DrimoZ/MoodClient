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

    cy.wait(1000)
  })

  it('Accept friend requests', () => {
    cy.connect('titi_le_belge')

    cy.get('#NavDiscover').click()
    cy.contains('Profiles').click()

    cy.contains('Marine').click()
    cy.wait(500)
    cy.contains('Accept Friend Request').click()
    cy.wait(1000)
  });

  it('Access a friend request by notification menu', () => {
    cy.connect('frontend_champ')

    cy.get('#Settings').click()
    cy.get('#GoToNotifications').click()

    cy.contains('Marine').first().click()
    cy.wait(500)
    cy.contains('Accept Friend Request').click()
    cy.wait(1000)
  });

  it('Delete friends', () => {
    cy.connect('marine0023')

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
  it("Check if a private conversation exist with Martin, otherwise, create one. FAILS IF IT EXISTS", () => {
    cy.connect('marine0023')
    cy.get('#NavMessages').click()

    cy.contains('Martin').should('not.exist')

    cy.get('#BtnCreateConversation').click()
    cy.contains('Martin').click()
    cy.get('#ConfirmCreateConv').click()
  });
  it('Check if a group conversation exist, otherwise, create one. FAILS IF IT EXISTS', () => {
    cy.connect('marine0023')
    cy.get('#NavMessages').click()
    cy.wait(1000)
    cy.contains('Many friends').should('not.exist')

    cy.get('#BtnCreateConversation').click()
    cy.wait(2000)
    cy.get('form').contains('Martin').click()
    cy.get('form').contains('Louis').click()
    cy.get('form').contains('Theo').click()
    cy.get('#GroupName').type('Many friends')
    cy.get('#ConfirmCreateConv').click()
  });

  it('Send a message in a private conversation', () => {
    cy.connect('marine0023')
    cy.get('#NavMessages').click()

    cy.get('#PrivateConv').click()
    cy.get('#Message').type('Ceci est un test')

    cy.get('#SendMessage').click()
  });

  it('Send a message in a group conversation', () => {
    cy.connect('marine0023')
    cy.get('#NavMessages').click()

    cy.get('#GroupConv').contains('Many friends').click()

    cy.get('#Message').type('Ceci est un test')

    cy.get('#SendMessage').click()
  });

  it("Check if all messages have been sent by connecting with Martin's account", () => {
    cy.connect('martin_p')
    cy.get('#NavMessages').click()

    cy.get('#GroupConv').contains('Many friends').click()
    cy.wait(1000)

    cy.get('#PrivateConv').click()
    cy.wait(1000)
  });
})
