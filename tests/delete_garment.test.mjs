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

// User id testing and correct category names have already been tested in other files

/**
* Various tests for path DELETE /users/{userId}/categories/{categoryName}/garments/{name}
*
* userId = the id of the user
* category = the category of the garment
* name = the name of the garment to be deleted
 **/

// Response 200, it worked, successfully deleted garment in a category
test("DELETE /users/{userId}/categories/{categoryName}/garments/{name} successfully deletes a garment", async (t) => {
    const userId = 45;
    const category = "Tops"
    const name = "Grey Crewneck"
    const response = await t.context.got.delete(`users/${userId}/categories/${category}/garments/${name}`, { throwHttpErrors: false });
    t.is(response.statusCode, 200);
    t.is(response.body.body, "Garment deleted successfully");
});

// Response 400, bad request, garment name doesn't exist 
test("DELETE /users/{userId}/categories/{categoryName}/garments/{name} bad request, garment name doesn't exist", async (t) => {
    const userId = 45;
    const category = "Tops"
    const name = "GreY Crewneck"
    const response = await t.context.got.delete(`users/${userId}/categories/${category}/garments/${name}`, { throwHttpErrors: false });
    t.is(response.statusCode, 404);
    t.is(response.body, "Garment doesn't exist");
});

// Response 400, bad request, user id doesn't exist
test("DELETE /users/{userId}/categories/{categoryName}/garments/{name} bad request, user id doesn't exist", async (t) => {
    const userId = 0;
    const category = "Tops"
    const name = "GreY Crewneck"
    const response = await t.context.got.delete(`users/${userId}/categories/${category}/garments/${name}`, { throwHttpErrors: false });
    t.is(response.statusCode, 400);
    t.is(response.body.message, "request.params.userId should be >= 1");
});

// Response 400, bad request, category doesn't exist
test("DELETE /users/{userId}/categories/{categoryName}/garments/{name} returns bad request because of incorrect category", async (t) => {
    const userId = 45;
    const category = "TopS"
    const name = "GreY Crewneck"
    const response = await t.context.got.delete(`users/${userId}/categories/${category}/garments/${name}`, { throwHttpErrors: false });
    t.is(response.statusCode, 400);
    t.is(response.body.message, "request.params.categoryName should be equal to one of the allowed values: Jackets, Tops, Pants, Shoes, Accessories")
});

// Response 400, bad request, category is empty
test("DELETE /users/{userId}/categories/{categoryName}/garments/{name} returns bad request because of empty category", async (t) => {
    const userId = 45;
    const category = ""
    const name = "GreY Crewneck"
    const response = await t.context.got.delete(`users/${userId}/categories/${category}/garments/${name}`, { throwHttpErrors: false });
    t.is(response.statusCode, 404);
    t.is(response.body.message, "not found")
});