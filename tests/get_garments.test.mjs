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

// User Id checks won't be repeated here, they have been implemented already in get_categories.test.mjs

/**
* Various tests for path GET /users/{userId}/categories/{categoryName}/garments
*
* userId = the id of the user
* category = the category the user wants to see
 **/

// Response 200, it worked, we get all garments of category Tops of user 45 (user id 45, category Tops)
test("GET /users/{userId}/categories/{categoryName}/garments returns correct response and status code for Tops", async (t) => {
    const userId = 45;
    const category = "Tops"
    const response = await t.context.got(`users/${userId}/categories/${category}/garments`, { throwHttpErrors: false });
    t.is(response.statusCode, 200);
    t.is(response.body[0].name, "Black Hoodie");
    t.is(response.body[1].name, "Grey Crewneck")
});

// Response 200, it worked, we get all garments of category Shoes of user 57 (user id 57, category Shoes)
test("GET /users/{userId}/categories/{categoryName}/garments returns correct response and status code for Shoes", async (t) => {
 	const userId = 57;
    const category = "Shoes"
    const response = await t.context.got(`users/${userId}/categories/${category}/garments`, { throwHttpErrors: false });
    t.is(response.statusCode, 200);
    t.is(response.body[0].name, "White Shoes");
    t.is(response.body[1].name, "White Airforce Shoes")
});

// Response 400, bad request (for categoryName 3), categoryName should be a string
test("GET /users/{userId}/categories/{categoryName}/garments returns 400 because categoryName isn't a string", async (t) => {
    const userId = 57;
    const category = 3
    const response = await t.context.got(`users/${userId}/categories/${category}/garments`, { throwHttpErrors: false });
    t.is(response.statusCode, 400);
    t.is(response.body.message, "request.params.categoryName should be equal to one of the allowed values: Jackets, Tops, Pants, Shoes, Accessories")
});

// Response 400, bad request (for categoryName Jeans), categoryName should exist
test("GET /users/{userId}/categories/{categoryName}/garments returns 404 because category Jeans doesn't exist", async (t) => {
    const userId = 57;
    const category = "Jeans"
    const response = await t.context.got(`users/${userId}/categories/${category}/garments`, { throwHttpErrors: false });
    t.is(response.statusCode, 400);
    t.is(response.body.message, "request.params.categoryName should be equal to one of the allowed values: Jackets, Tops, Pants, Shoes, Accessories")
});

// Response 400, bad request (for categoryName TopS), categoryName should exist
test("GET /users/{userId}/categories/{categoryName}/garments returns 404 because category TopS doesn't exist", async (t) => {
    const userId = 45;
    const category = "TopS"
    const response = await t.context.got(`users/${userId}/categories/${category}/garments`, { throwHttpErrors: false });
    t.is(response.statusCode, 400);
    t.is(response.body.message, "request.params.categoryName should be equal to one of the allowed values: Jackets, Tops, Pants, Shoes, Accessories")
});