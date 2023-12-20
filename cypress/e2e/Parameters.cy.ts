import {describe} from "mocha";

describe('Modifying my password', () => {
  it('Connection and access to parameters', () => {
  });

  beforeEach(() =>{
    cy.connect('marine0023')
    cy.parameters()
  })

  it("Old password is wrong", () => {
    cy.modifyPassword('Wrong', 'Stronger#2')
  })

  it("Password doesn't match conditions", () => {
    cy.modifyPassword('Strong#1', 'weak#1')
  });

  it('Password confirmation is wrong', () => {
    cy.get('#OldPassword').type('Strong#1')
    cy.get('#NewPassword').type('Stronger#2')
    cy.get('#PasswordConfirmation').type('wrong{enter}')
  });

  it('Password has been modified', () => {
    cy.modifyPassword('Strong#1', 'Stronger#2')
  })
  it('Reseting', () => {
    cy.modifyPassword('Stronger#2', 'Strong#1')
  });
})
describe('Privacy settings', () => {
  //
  //Publications
  //
  it("Check if i can access to Martin's publications", () => {
    cy.connect('marine0023')

    cy.get("#NavDiscover").click()
    cy.contains("Profiles").click()
    cy.contains("Martin").click()
  })

  it("Change Martin's publication privacy", () => {
    cy.connect('martin_p')

    cy.get('#Parameters').click()
    cy.get('#GoToParameters').click()

    cy.contains('Account Privacy').click()
    cy.get('#FriendPrivacySlider').click()
  })

  it("Check if i can access to Martin's publications", () => {
    cy.connect('marine0023')

    cy.get("#NavDiscover").click()
    cy.contains("Profiles").click()
    cy.contains("Martin").click()
  })

  //
  // Friends
  //
  it("Check if i can access to Martin's friends", () => {
    cy.connect('marine0023')

    cy.get("#NavDiscover").click()
    cy.contains("Profiles").click()
    cy.contains("Martin").click()
    cy.get('#BtnFriends').click()
  })

  it("Change Martin's publication privacy", () => {
    cy.connect('martin_p')

    cy.get('#Parameters').click()
    cy.get('#GoToParameters').click()

    cy.contains('Account Privacy').click()
    cy.get('#FriendPrivacySlider').click()
  })

  it("Check if i can access to Martin's publications", () => {
    cy.connect('marine0023')

    cy.get("#NavDiscover").click()
    cy.contains("Profiles").click()
    cy.contains("Martin").click()
  })

  cy.disconnect()
    cy.wait(500)

    cy.connect('martin_p')

    cy.get('#Parameters').click()
    cy.get('#GoToParameters').click()
    cy.contains('Account Privacy').click()

    cy.get('#FriendPrivacySlider').click()
  });

})

