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

    cy.get('#PrivateConv').contains('Martin').should('not.exist')

    cy.get('#BtnCreateConversation').click()
    cy.contains('Martin').click()
    cy.get('#ConfirmCreateConv').click()
  });
  it('Check if a group conversation exist, otherwise, create one. FAILS IF IT EXISTS', () => {
    cy.connect('marine0023')
    cy.get('#NavMessages').click()

    cy.get('#GroupConv').should('not.exist')

    cy.get('#BtnCreateConversation').click()
    cy.get('#Friend').click({multiple:true})
    cy.get('#GroupName').type('All my friends')
    cy.get('#ConfirmCreateConv').click()
  });

  it('Send a message in a private conversation', () => {
    cy.connect('marine0023')
    cy.get('#NavMessages').click()

    cy.get('#PrivateConv').click()
    cy.get('#Message').type('Ceci est un test')

    cy.get('#SendMessage').click()
  });

  it('Check if martin received the message and send a message back', () => {
    cy.connect('martin_p')
    cy.get('#NavMessages').click()

    cy.get('#PrivateConv').contains('Marine').click()

    cy.get('')
  });


  it('Send a Real Time message', () => {

  });
})
