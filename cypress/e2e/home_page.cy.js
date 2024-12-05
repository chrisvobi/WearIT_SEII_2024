describe('Home Page', () => {
	beforeEach(() => {
		cy.visit('http://localhost:8080/docs')
	})

    it('Home Page', () => {
        cy.contains('h2', 'WearIT API')
        cy.get(".expand-operation").click() // check if i can click the default arrow
        cy.get('div#model-Garment span.model-toggle').click() // check if i can expand the garment schema
        cy.contains('.model', "brand") // check if correct text in it
        cy.get('h4 > svg').click(); // check if i can click the schemas arrow
        cy.get(".download-url-wrapper").type("asd") // check if i can type in search
        cy.get(".download-url-button").click() // check if i can click the explore button 
    })
})