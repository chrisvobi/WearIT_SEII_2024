import http from "node:http";
import test from "ava";
import got from "got";
import app from "../index.js";
import { getCategoryGarments } from "../controllers/Category.js";


test.before(async (t) => {
	t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
	t.context.server.close();
});

// User Id checks won't be repeated here, they have been done already in get_categories.test.mjs

// Response 200, it worked, we get all garments of category Tops of user 45 (user id 45, category Tops)
test("GET /users/{user-id}/categories/{category-name}/garments returns correct response and status code for Tops", async (t) => {
	const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await getCategoryGarments(null, response, null, 45, "Tops");
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 200);
    t.is(parsedBody.body[0].name, "Black Hoodie");
    t.is(parsedBody.body[1].name, "Grey Crewneck");
});

// Response 200, it worked, we get all garments of category Shoes of user 57 (user id 57, category Shoes)
test("GET /users/{user-id}/categories/{category-name}/garments returns correct response and status code for Shoes", async (t) => {
	const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await getCategoryGarments(null, response, null, 57, "Shoes");
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 200);
    t.is(parsedBody.body[0].name, "White Shoes");
    t.is(parsedBody.body[1].name, "White Airforce Shoes");
});

// Response 400, bad request (for categoryName 3), categoryName should be a string
test("GET /users/{user-id}/categories/{category-name}/garments returns 400 because categoryName isn't a string", async (t) => {
	const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await getCategoryGarments(null, response, null, 57, 3);
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 400);
    t.is(parsedBody.body, "Category isn't a string");
});

// Response 400, bad request (for categoryName Jeans), categoryName should exist
test("GET /users/{user-id}/categories/{category-name}/garments returns 404 because category doesn't exist", async (t) => {
	const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await getCategoryGarments(null, response, null, 57, "Jeans");
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 404);
    t.is(parsedBody.body, "Category doesn't exist");
});