describe('Delete outfit UI test', () => {
	beforeEach(() => {
		cy.visit('http://localhost:8080/docs')
        cy.get("#operations-default-deleteOutfit").click() // open dropdown menu of endpoint
	})

    it('Check if it is displayed correctly', () => {
        cy.get('p').contains("FR9 - The user must be able to delete saved outfits.")
        cy.get(".content-type").should('have.length', 3) // media type menu
        cy.get(".response-col_status").contains(200) // check default response appearing on ui
        cy.get(".response-col_description").contains("Successfull deletion")
        cy.get(".highlight-code").contains("{}")
    })

    it('Test the ui for the try out' , () => {
        cy.get('.try-out').click() // click try out
        cy.get('input[placeholder="userId - user that deletes the outfit"]').type(1) // type user id
        cy.get('input[placeholder="name - the name of the outfit"]').type("test_outfit") // type outfit name
        cy.get(".opblock-control__btn").click() // click execute
        cy.get(".request-url").contains("http://localhost:8080/users/1/outfits/test_outfit") // check that request url appears right
        cy.get(".btn-clear").click() // clear
        cy.get('.try-out').click() // cancel
    })
})