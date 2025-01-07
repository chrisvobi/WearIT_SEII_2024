describe('login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/docs/'); // Replace with the correct URL
    });

    it('GET OUTFITS TEST', () => {
        cy.get('#operations-default-getOutfit').click();
        cy.get('.try-out').click();
        cy.get('input[placeholder="userId - the id of the user"]').type(`'exampleUserId'`);
        cy.get('input[placeholder="name - the name of the outfit"]').type(`'exampleNameOfTheOutfit'`);
        cy.get(".opblock-control__btn").click(); 
        cy.get(".content-type").should('have.length', 3); // Ensure the response has the correct content type
    });

    it('POST OUTFITS TEST', () => {
        cy.get('#operations-default-createOutfit').click();
        cy.get('p').contains("FR7-The user must be able to save outfit");
        cy.get('.try-out').click();
        cy.get('input[placeholder="userId - user that creates the outfit"]').type(`'exampleUserId'`);
        cy.get(".content-type").should('have.length', 5); // Ensure the request payload has the correct content type
        cy.get('p').contains("Outfit model");
        cy.get(".examples-select").should('have.length', 1); // Ensure there is an example payload available
        cy.get(".opblock-control__btn").click(); 
        cy.get(".content-type").should('have.length', 5); // Verify the response payload content type
    });

    it('PUT OUTFITS TEST', () => {
        cy.get('#operations-default-updateOutfit').click();
        cy.get('p').contains("FR8-The user must be able to update an outfit");
        cy.get('.try-out').click();
        cy.get('input[placeholder="userId - user that updates the outfit"]').type(`'exampleUserId'`);
        cy.get('input[placeholder="name - the name of the outfit"]').type(`'exampleNameOfTheOutfit'`);
        cy.get('textarea[placeholder="Outfit model"]').type(`{
            "name": "UpdatedOutfit",
            "garments": [
                { "name": "UpdatedGarment", "size": "L", "brand": "UpdatedBrand", "imagePath": "UpdatedImagePath" }
            ]
        }`);
        cy.get(".opblock-control__btn").click(); 
        cy.get(".content-type").should('have.length', 5); // Verify response payload structure
    });

    it('DELETE OUTFITS TEST', () => {
        cy.get('#operations-default-deleteOutfit').click();
        cy.get('p').contains("FR9-The user must be able to delete an outfit");
        cy.get('.try-out').click();
        cy.get('input[placeholder="userId - user that deletes the outfit"]').type(`'exampleUserId'`);
        cy.get('input[placeholder="name - the name of the outfit"]').type(`'exampleNameOfTheOutfit'`);
        cy.get(".opblock-control__btn").click();
        cy.get(".response-col_description").contains("Outfit deleted successfully"); // Verify the success message
    });
});
