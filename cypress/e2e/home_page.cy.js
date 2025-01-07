describe('Home Page', () => {
	beforeEach(() => {
		cy.visit('http://localhost:8080/docs')
	})

    it('Check if the page is displayed correctly', () => {
        cy.contains('h2', 'WearIT API')
    })

    it('Check if I can click the arrows', () => {
        cy.get(".expand-operation").click() // check if i can click the default arrow
        cy.get('div#model-Garment span.model-toggle').click() // check if i can expand the garment schema
        cy.contains('.model', "brand") // check if correct text in it
        cy.get('h4 > svg').click(); // check if i can click the schemas arrow
    })

    it ('Check if I can use the search', () => {
        cy.get(".download-url-input").type("{selectAll}{backspace}testing") // check if i can type in search
        cy.get(".download-url-button").click() // check if i can click the explore button 
    })
})