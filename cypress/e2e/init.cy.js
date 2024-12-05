describe('login', () => {
	beforeEach(() => {
		cy.visit('http://localhost:8080/docs')
	})

    it('Test', () => {
        cy.get('#operations-default-getCategories').click()
        cy.get('p').contains("FR1 - The user must be able to manage their virtual wardrobe. Displays the categories to the user")
        cy.get('.try-out').click()
        cy.get('input[placeholder="user-id - ID of the user"]').type(1)
        cy.get(".opblock-control__btn").click()
        cy.get(".content-type").should('have.length', 1)
    })

    it('Home Page', () => {
        cy.contains('h2', 'WearIT API')
        cy.get(".expand-operation").click()
       
        cy.get('div#model-Garment span.model-toggle').click()
        cy.contains('.model', "brand")
        cy.get(".download-url-wrapper").type("asd")
        cy.get(".download-url-button").click() 
    })
})