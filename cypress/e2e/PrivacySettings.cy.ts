describe('Modifier ses paramètres de confidentialités', () => {
  it('passes', () => {
    cy.connect('marine0023')

    cy.get("#NavDiscover").click()
    cy.contains("Profiles").click()
    cy.contains("Martin").click()
    cy.get('#BtnFriends').click()

    cy.wait(2000)

    cy.disconnect()

    cy.connect('martin_p')

    cy.get('#Parameters').click()
    cy.get('#GoToParameters').click()

    cy.contains('Account Privacy').click()
    cy.get('#FriendPrivacySlider').click()

    cy.wait(500)

    cy.disconnect()

    cy.wait(500)

    cy.connect('marine0023')

    cy.get("#NavDiscover").click()
    cy.contains("Profiles").click()
    cy.contains("Martin").click()
    cy.get('#BtnFriends').click()

    cy.wait(500)

    cy.disconnect()

    cy.wait(500)

    cy.connect('martin_p')

    cy.get('#Parameters').click()
    cy.get('#GoToParameters').click()
    cy.contains('Account Privacy').click()

    cy.get('#FriendPrivacySlider').click()
  })
})
