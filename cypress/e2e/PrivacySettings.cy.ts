describe('Modifier ses paramètres de confidentialités', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/')
    cy.get('#Login').type('marine0023')
    cy.get('#Password').type('Strong#1{enter}')

    cy.get("#NavDiscover").click()
    cy.contains("Profiles").click()
    cy.contains("Martin").click()
    cy.get('#BtnFriends').click()

    cy.wait(2000)

    // Disconnect
    cy.get('#Parameters').click()
    cy.contains('Disconnect').click()

    cy.get('#Login').type('martinp')
    cy.get('#Password').type('Strong#1{enter}')

    cy.get('#Parameters').click()
    cy.get('#GoToParameters').click()

    cy.contains('Account Privacy').click()
    cy.get('#FriendPrivacySlider').click()

    cy.wait(500)

    // Disconnect
    cy.get('#Parameters').click()
    cy.contains('Disconnect').click()

    cy.get('#Login').type('marine0023')
    cy.get('#Password').type('Strong#1{enter}')

    cy.get("#NavDiscover").click()
    cy.contains("Profiles").click()
    cy.contains("Martin").click()
    cy.get('#BtnFriends').click()

    cy.wait(2000)

    // Disconnect
    cy.get('#Parameters').click()
    cy.contains('Disconnect').click()

    cy.get('#Login').type('martinp')
    cy.get('#Password').type('Strong#1{enter}')

    cy.get('#Parameters').click()
    cy.get('#GoToParameters').click()

    cy.contains('Account Privacy').click()
    cy.get('#FriendPrivacySlider').click()
  })
})
