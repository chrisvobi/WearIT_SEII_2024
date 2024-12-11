import http from "node:http";
import test from "ava";
import got from "got";
import app from "../index.js";


test.before(async (t) => {
	t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
	t.context.server.close();
});

// Checks for extensive user id testing and correct category names have already been implemented in other files

// Response 200, it worked, successfully added garment to category
test("POST /users/{userId}/categories/{categoryName}/garments with a correct garment", async (t) => {
    const userId = 45;
    const category = "Tops"
    const garment = {
        "size" : "M",
        "imagePath" : "../images/45/Grey_Crewneck.jpeg",
        "name" : "Grey Crewneck",
        "brand" : "Zara"
    };
    const response = await t.context.got.post(`users/${userId}/categories/${category}/garments`, { throwHttpErrors: false,
        json: garment
    });
    t.is(response.statusCode, 201);
    t.is(response.body.name, "Grey Crewneck");
});

// Response 409, conflict, garment with given name already exists in the category
test("POST /users/{userId}/categories/{categoryName}/garments with garment name that exists", async (t) => {
    const userId = 45;
    const category = "Tops"
    const garment = {
        "size" : "M",
        "imagePath" : "../images/45/Black Hoodie.jpeg",
        "name" : "Black Hoodie",
        "brand" : "Zara"
    };
    const response = await t.context.got.post(`users/${userId}/categories/${category}/garments`, { throwHttpErrors: false,
        json: garment
    });
    t.is(response.statusCode, 409);
    t.is(response.body, "Garment with given name already exists");
});


// Response 400, bad request, garment size given in wrong format (int instead of string)
test("POST /users/{userId}/categories/{categoryName}/garments with garment that has an integer instead of string", async (t) => {
    const userId = 45;
    const category = "Tops"
    const garment = {
        "size" : 45,
        "imagePath" : "../images/45/Black Hoodie.jpeg",
        "name" : "Black Hoodie",
        "brand" : "Zara"
    };
    const response = await t.context.got.post(`users/${userId}/categories/${category}/garments`, { throwHttpErrors: false,
        json: garment
    });
    t.is(response.statusCode, 400);
    t.is(response.body.message, "request.body.size should be string");
});

// Response 400, bad request, garment given in wrong format (missing size field)
test("POST /users/{userId}/categories/{categoryName}/garments with garment that misses size field", async (t) => {
	const userId = 45;
    const category = "Tops"
    const garment = {
        "imagePath" : "../images/45/Black Hoodie.jpeg",
        "name" : "Black Hoodie",
        "brand" : "Zara"
    };
    const response = await t.context.got.post(`users/${userId}/categories/${category}/garments`, { throwHttpErrors: false,
        json: garment
    });
    t.is(response.statusCode, 400);
    t.is(response.body.message, "request.body should have required property \'size\'");
});