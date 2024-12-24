import http from "node:http";
import test from "ava";
import got from "got";
import app from "../index.js";
// Run server before every test
test.before(async (t) => {
	t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
});
// Close server fater every test
test.after.always((t) => {
	t.context.server.close();
});
// Checks for extensive user id testing and correct category names have already been implemented in other files

/**
* Various tests for path PUT /users/{userId}/categories/{categoryName}/garments/{name}
*
* userId = the id of the user
* category = the category in which the garment to be edited is
* name = the name of the garment to be edited
* garment = the new data of the garment to be edited
 **/

// Response 200, it worked, successfully edited garment in a category
test("PUT /users/{userId}/categories/{categoryName}/garments/{name} with a correct data, change size", async (t) => {
	const userId = 45;
    const category = "Tops"
    const name = "Grey Crewneck"
    const garment = {
        "size" : "L", // this is M in the database, edited to L
        "imagePath" : "../images/45/Grey_Crewneck.jpeg",
        "name" : "Grey Crewneck",
        "brand" : "Zara"
    };
    const response = await t.context.got.put(`users/${userId}/categories/${category}/garments/${name}`, { throwHttpErrors: false,
        json: garment
    });
    t.is(response.statusCode, 200);
    t.is(response.body.name, garment.name);
    t.is(response.body.size, garment.size);
});

// Response 200, it worked, successfully edited garment in a category
test("PUT /users/{userId}/categories/{categoryName}/garments/{name} with a correct data, change name and path", async (t) => {
	const userId = 45;
    const category = "Tops"
    const name = "Grey Crewneck"
    const garment = {
        "size" : "M",
        "imagePath" : "../images/45/Grey_Crewneck_with_hole.jpeg",
        "name" : "Grey Crewneck with hole",
        "brand" : "Zara"
    };
    const response = await t.context.got.put(`users/${userId}/categories/${category}/garments/${name}`, { throwHttpErrors: false,
        json: garment
    });
    t.is(response.statusCode, 200);
    t.is(response.body.name, garment.name);
    t.is(response.body.size, garment.size);
});

// Response 409, conflict, edited garment already exists in the database
test("PUT /users/{userId}/categories/{categoryName}/garments/{name} already exists", async (t) => {
    const userId = 45;
    const category = "Tops"
    const name = "Grey Crewneck"
    const garment = {
        "size" : "M", 
        "imagePath" : "../images/45/Grey_Crewneck.jpeg",
        "name" : "Grey Crewneck",
        "brand" : "Zara"
    };
    const response = await t.context.got.put(`users/${userId}/categories/${category}/garments/${name}`, { throwHttpErrors: false,
        json: garment
    });
    t.is(response.statusCode, 409);
    t.is(response.body, "Garment already exists");
});

// Response 404, bad request, name of garment to be edited doesn't exist
test("PUT /users/{userId}/categories/{categoryName}/garments/{name} with a wrong name", async (t) => {
    const userId = 45;
    const category = "Tops"
    const name = "GreY Crewneck"
    const garment = {
        "size" : "L", // this is M in the database, edited to L
        "imagePath" : "../images/45/Grey_Crewneck.jpeg",
        "name" : "Grey Crewneck",
        "brand" : "Zara"
    };
    const response = await t.context.got.put(`users/${userId}/categories/${category}/garments/${name}`, { throwHttpErrors: false,
        json: garment
    });
    t.is(response.statusCode, 404);
    t.is(response.body, "Garment doesn't exist");
});

// Response 400, bad request, category doesn't exist
test("PUT /users/{userId}/categories/{categoryName}/garments/{name} returns bad request because of incorrect category", async (t) => {
    const userId = 45;
    const category = "TopS"
    const name = "Grey Crewneck"
    const garment = {
        "size" : "L", // this is M in the database, edited to L
        "imagePath" : "../images/45/Grey_Crewneck.jpeg",
        "name" : "Grey Crewneck",
        "brand" : "Zara"
    };
    const response = await t.context.got.put(`users/${userId}/categories/${category}/garments/${name}`, { throwHttpErrors: false,
        json: garment
    });
    t.is(response.statusCode, 400);
    t.is(response.body.message, "request.params.categoryName should be equal to one of the allowed values: Jackets, Tops, Pants, Shoes, Accessories");
});