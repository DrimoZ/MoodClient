describe('Modifying my password', () => {
  it("Old password is wrong", () => {
    cy.connect('marine0023')
    cy.parameters()
    cy.modifyPassword('Wrong', 'Stronger#2')
  })

  it("Password doesn't match conditions", () => {
    cy.connect('marine0023')
    cy.parameters()
    cy.modifyPassword('Strong#1', 'weak#1')
  });

  it('Password confirmation is wrong', () => {
    cy.connect('marine0023')
    cy.parameters()
    cy.get('#OldPassword').type('Strong#1')
    cy.get('#NewPassword').type('Stronger#2')
    cy.get('#PasswordConfirmation').type('wrong{enter}')
  });

  it('Password has been modified', () => {
    cy.connect('marine0023')
    cy.parameters()
    cy.modifyPassword('Strong#1', 'Stronger#2')
    cy.wait(1000)
  })

  it('Reseting', () => {
    cy.fixture('infos').then((infos) => {
      cy.visit(infos.website)
    })
    cy.get('#Login').type('marine0023')
    cy.get('#Password').type('Stronger#2{enter}')
    cy.parameters()
    cy.modifyPassword('Stronger#2', 'Strong#1')
    cy.wait(1000)
  });
})

describe('Privacy settings', () => {
  afterEach(()=>{
    cy.wait(1000)
  })

  //
  // Account
  //

  it("Check if i can access to Martin's account", () => {
    cy.connect('marine0023')

    cy.get("#NavDiscover").click()
    cy.contains("Profiles").click()
    cy.contains("Martin").click()
  })

  it("Change Martin's account privacy", () => {
    cy.connect('martin_p')

    cy.parameters()

    cy.contains('Account Privacy').click()
    cy.get('#AccountPrivacySlider').click()
  })

  it("Check if i can access to Martin's account", () => {
    cy.connect('marine0023')

    cy.get("#NavDiscover").click()
    cy.contains("Profiles").click()
    cy.contains("Martin").click()
  })
  it('Setting back Account privacy', () => {
    cy.connect('martin_p')

    cy.parameters()

    cy.contains('Account Privacy').click()
    cy.get('#AccountPrivacySlider').click()
  });

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
  it("Change Martin's friends privacy", () => {
    cy.connect('martin_p')

    cy.parameters()

    cy.contains('Account Privacy').click()
    cy.get('#FriendPrivacySlider').click()
  })
  it("Check if i can access to Martin's friends", () => {
    cy.connect('marine0023')

    cy.get("#NavDiscover").click()
    cy.contains("Profiles").click()
    cy.contains("Martin").click()
    cy.get('#BtnFriends').click()
  })
  it('Setting back friends privacy', () => {
    cy.connect('martin_p')

    cy.parameters()

    cy.contains('Account Privacy').click()
    cy.get('#FriendPrivacySlider').click()
  });

  //
  // Publication
  //

  it("Check if i can access to Martin's publication", () => {
    cy.connect('marine0023')

    cy.get("#NavDiscover").click()
    cy.contains("Profiles").click()
    cy.contains("Martin").click()
  })

  it("Change Martin's account publication", () => {
    cy.connect('martin_p')

    cy.parameters()

    cy.contains('Account Privacy').click()
    cy.get('#PublicationPrivacySlider').click()
  })

  it("Check if i can access to Martin's publication", () => {
    cy.connect('marine0023')

    cy.get("#NavDiscover").click()
    cy.contains("Profiles").click()
    cy.contains("Martin").click()
  })
  it('Setting back publication privacy', () => {
    cy.connect('martin_p')

    cy.parameters()

    cy.contains('Account Privacy').click()
    cy.get('#PublicationPrivacySlider').click()
  });
})
