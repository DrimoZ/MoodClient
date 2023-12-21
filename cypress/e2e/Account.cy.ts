describe('Account management', () => {
  it("Password doesn't match conditions", () => {
    cy.fixture('infos').then((infos) => {
      cy.visit(infos.website)
    })
    cy.get('#GoToSignUp').click()

    cy.get('#Name').type("Martin Pecheur")
    cy.get('#Login').type("Martin le M")
    cy.get('#Password').type("weak")
    cy.get('#Mail').type("martinlem@martin.be")
    cy.get('#Birthdate').type("2006-06-10")
    cy.get('#PasswordConfirmation').type("weak")

    cy.Password("weak#")
    cy.Password("weak1")
    cy.Password("longweak#")
    cy.Password("strong#1")
  })

  it.only('Successful account creation', () => {
    cy.fixture('infos').then((infos) => {
      cy.visit(infos.website)
    })
    cy.get('#GoToSignUp').click()

    cy.get('#Name').type("Martin Anti-Pecheur")
    cy.get('#Login').type("Martin le AP")
    cy.get('#Mail').type("martinlem@martin.be")
    cy.get('#Birthdate').type("2006-06-10")
    cy.Password("Strong#1")
    cy.get('#PasswordConfirmation').type("Strong#1")

    cy.get('#BtnSignUp').click()
    cy.wait(2000)
  })

  it('Change profile picture', () => {
    cy.connect('Martin le AP')

    cy.get('#Profile').click()
    cy.get("#ChangeProfilePicture").click()
    cy.get('input[type=file]').selectFile('cypress\\downloads\\bg.png')
    cy.contains('Submit').click()

    cy.get("#ChangeProfilePicture").click()
    cy.get('input[type=file]').selectFile('cypress\\downloads\\fish.png')
    cy.contains('Submit').click()

    cy.get("#ChangeProfilePicture").click()
    cy.get('input[type=file]').selectFile('cypress\\downloads\\Goldorak.jpg')
    cy.contains('Submit').click()
  })

  it('Edit my personnal informations', () => {
    cy.connect('Martin le AP')

    cy.get('#Profile').click()

    cy.contains('Account').click()
    cy.wait(1000)
    cy.contains('Edit Account').click()

    cy.get('#InputFullName').clear()
    cy.get('#InputFullName').type('Adurian')
    cy.get('#InputEmail').clear()
    cy.get('#InputEmail').type('Adurian@Ninja.com')
    cy.get('#InputBirthDate').clear()
    cy.get('#InputBirthDate').type('1999-04-11')
    cy.get('#InputTitle').clear()
    cy.get('#InputTitle').type('Ninja')
    cy.get('#InputDescription').clear()
    cy.get('#InputDescription').type('BAC+5 Ninja')

    cy.contains('Validate Changes').click()

    cy.contains('Account').click()

    cy.contains('Edit Account').click()

    cy.get('#InputFullName').clear()
    cy.get('#InputFullName').type('Martin Anti-Pecheur')
    cy.get('#InputEmail').clear()
    cy.get('#InputEmail').type('martinlem@martin.be')
    cy.get('#InputBirthDate').clear()
    cy.get('#InputBirthDate').type('2006-06-10')
    cy.get('#InputTitle').clear()
    cy.get('#InputTitle').type("L'originel")
    cy.get('#InputDescription').clear()
    cy.get('#InputDescription').type('#Hérétique')

    cy.contains('Validate Changes').click()
  })

  it('Delete my account', () => {
    cy.connect('Martin le AP')
    cy.deleteMyAccount()
  })
})
describe('Each way to connect to the website', () => {

  it('Trying to log in but with wrong login', () => {
    cy.connect("idontexist")
  })

  it('Trying to log in but with wrong password', () => {
    cy.fixture('infos').then((infos) => {
      cy.visit(infos.website)
    })
    cy.get('#Login').type('marine0023')
    cy.get('#Password').type('wrong')
  })

  it('Log in correctly', () => {
    cy.connect('marine0023')
  })
})
