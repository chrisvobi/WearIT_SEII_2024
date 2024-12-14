describe('Put outfit UI test', () => {
	beforeEach(() => {
		cy.visit('http://localhost:8080/docs')
        cy.get("#operations-default-updateOutfit").click() // open dropdown menu of endpoint
	})

    it('Check if it is displayed correctly', () => {
        cy.get('p').contains("FR8-The user must be able to edit saved outfits.") // check if it contains the description
        cy.get('.model-example').contains('garments') // check if it contains the response body
        cy.get(".response-col_status").contains(200) // check if it contains the default response
        cy.get(".response-col_description").contains("Resource updated")
        cy.get(".response-col_description").contains("garment")
    })

    it('Test the ui for the try out' , () => {
        cy.get('.try-out').click() // click try out
        cy.get('input[placeholder="userId - user that updates the outfit"]').type(1) // type user id
        cy.get('input[placeholder="name - the name of the outfit"]').type("outfit") // type outfit name
        cy.get(".opblock-control__btn").click() // click execute
        cy.get(".request-url").contains("http://localhost:8080/users/1/outfits/outfit") // check that request url appears right
        cy.get(".btn-clear").click() // clear
        cy.get('.try-out').click() // cancel
    })
})