describe('login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/docs/'); //  URL
    });

    it('GET OUTFITS TEST', () => {
        cy.get('#operations-default-getOutfit').click();
        cy.get('.try-out').click();
        cy.get('input[placeholder="userId - the id of the user"]').type('exampleUserId');
        cy.get('input[placeholder="name - the name of the outfit"]').type('exampleNameOfTheOutfit');
        cy.get(".opblock-control__btn").click(); 
        cy.get(".content-type").should('have.length', 3);// Ensure the response has the correct content type
    });


    it('POST OUTFITS TEST', () => {
        cy.get('#operations-default-createOutfit').click();
        cy.get('p').contains("FR7-The user must be able to save outfit");
        cy.get('.try-out').click();
        cy.get('input[placeholder="userId - user that creates the outfit"]').type('exampleUserId');
        cy.get(".content-type").should('have.length', 5);// Ensure the request payload has the correct content type
        cy.get('p').contains("Outfit model");
        cy.get(".examples-select").should('have.length', 1);// Ensure there is an example payload available
        cy.get(".opblock-control__btn").click(); 
        cy.get(".content-type").should('have.length', 5);
       // Verify the response payload content type
    });

});