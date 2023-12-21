describe('Post a publication', () => {
  it('Normal Post', () => {
    cy.connect("martin_p")
    cy.get("#NavCreatePub").click()
    cy.wait(500)

    cy.get("input[type=file]").selectFile("cypress\\downloads\\codingCat.gif")
    cy.get("#PublicationText").type("Sacré plaque !")
    cy.contains("Publish").click()
  })

  it('Trying to post without image', () => {
    cy.connect("martin_p")
    cy.get("#NavCreatePub").click()
    cy.wait(500)

    cy.get("#PublicationText").type("Sacré plaque !")
  });

  it('Trying to post without text', () => {
    cy.connect("martin_p")
    cy.get("#NavCreatePub").click()
    cy.wait(500)

    cy.get("input[type=file]").selectFile("cypress\\downloads\\bg.png")
  });

  it('Trying to post a file that is not a png, jpg or a gif', () => {
    cy.connect("martin_p")
    cy.get("#NavCreatePub").click()
    cy.wait(500)

    cy.get("input[type=file]").selectFile("cypress\\downloads\\fish.zip")
  });

  it('Post multiple images', () => {
    cy.connect("frontend_champ")
    cy.get("#NavCreatePub").click()
    cy.wait(500)

    cy.get("input[type=file]").selectFile("cypress\\downloads\\sweating.gif")
    cy.get("input[type=file]").selectFile("cypress\\downloads\\Goldorak.jpg")
    cy.get("input[type=file]").selectFile("cypress\\downloads\\bg.png")

    cy.get("#PublicationText").type("Sacré plaque !")

    cy.contains("Publish").click()
  });

  it('Modify my images while posting', () => {
    cy.connect("martin_p")
    cy.get("#NavCreatePub").click()
    cy.wait(500)

    cy.get("input[type=file]").selectFile("cypress\\downloads\\fish.png")
    cy.get('#DeleteThisImage').click()
  });

  it("Carousel test to look at images i'm posting", () => {
    cy.connect("martin_p")
    cy.get("#NavCreatePub").click()
    cy.wait(500)

    cy.get("input[type=file]").selectFile("cypress\\downloads\\fish.png")
    cy.get("input[type=file]").selectFile("cypress\\downloads\\Goldorak.jpg")
    cy.get("input[type=file]").selectFile("cypress\\downloads\\bg.png")

    cy.get('#RightCarousel').click()
    cy.get('#RightCarousel').click()
    cy.get('#LeftCarousel').click()
    cy.get('#LeftCarousel').click()
    cy.get('#RightCarousel').click()
    cy.get('#RightCarousel').click()
  });
})
describe('Look at publications', () => {
  it('Scroll through publications', () => {
    cy.connect('marine0023')
    cy.wait(5000)
    cy.get('#NewsFeed').scrollTo(0,1000)
    cy.get('#NewsFeed').scrollTo(1000,2000)
    cy.get('#NewsFeed').scrollTo(2000,3000)
    cy.get('#NewsFeed').scrollTo(4000,5000)
    cy.get('#NewsFeed').scrollTo('bottom')
    cy.wait(1000)
  });

  it('Look at publication in Discover research', () => {
    cy.connect('marine0023')
    cy.get('#NavDiscover').click()
    cy.get('#searchInput').type('m')
  });
})
describe('Delete my publication', () => {
  it('Delete a publication on my profile', () => {
    cy.connect("martin_p")
    cy.wait(500)

    cy.get("#Profile").click()
    cy.get(".pub_img").first().click()
    cy.get("#DeleteThisPub").click()
  });

  it('Delete an image while in my post edition', () => {
    cy.connect("martin_p")
    cy.wait(500)

    cy.get("#NavCreatePub").click()
    cy.wait(500)
    cy.get("input[type=file]").selectFile("cypress\\downloads\\fish.png")

    cy.get('#DeleteThisImage').click()
  });
})

describe('Likes and Comments', () => {
  it('Like a publication', () => {
    cy.connect('martin_p')
    cy.get('#NavNewsFeed').click()
    cy.get('#BtnLike').click()
  });

  it('Comment a publication', () => {
    cy.connect('martin_p')
    cy.get('#NavNewsFeed').click()

    cy.get('#BtnComment').click()
    cy.get('#AddComment').type('Waw, Les poissons, ils ont tellement de charisme{enter}')
    cy.wait(1000)
  });

  it('Delete my comment', () => {
    cy.connect('martin_p')
    cy.get('#NavNewsFeed').click()

    cy.contains("Comment ( 1 )").click()
    cy.contains('X').first().click()
  });
})
