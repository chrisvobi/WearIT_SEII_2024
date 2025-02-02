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

// Extensive tests for the user id are done here

/**
* Various tests for path GET /users/{userId}/categories
*
* userId = the id of the user
 **/

// Response 200, it worked (for user id 45)
test("GET /users/{userId}/categories returns correct response and status code", async (t) => {
    const userId = 45;
    const response = await t.context.got(`users/${userId}/categories`, { throwHttpErrors: false });
    t.is(response.statusCode, 200);
    t.is(response.body[0], "Jackets");
    t.is(response.body[1], "Tops");
});

// Response 404, user not found (for user id 145)
test("GET /users/{userId}/categories returns 404 because userId doesn't exist", async (t) => {
    const userId = 145;
    const response = await t.context.got(`users/${userId}/categories`, { throwHttpErrors: false });
    t.is(response.statusCode, 404);
    t.is(response.body, "User doesn't exist");
});

// Response 400, bad request (for negative user id -3)
test("GET /users/{userId}/categories returns 400 because userId < 1", async (t) => {
    const userId = -3;
    const response = await t.context.got(`users/${userId}/categories`, { throwHttpErrors: false });
    t.is(response.statusCode, 400);
    t.is(response.body.message, "request.params.userId should be >= 1");
});

// Response 400, bad request (for string user id mpampis)
test("GET /users/{userId}/categories returns 400 because userId was not integer", async (t) => {
    const userId = "mpampis";
    const response = await t.context.got(`users/${userId}/categories`, { throwHttpErrors: false });
    t.is(response.statusCode, 400);
    t.is(response.body.message, "request.params.userId should be integer");
});

// Response 404, bad request (for empty user id)
test("GET /users/{userId}/categories returns 404 because userId was not given", async (t) => {
    const userId = "";
    const response = await t.context.got(`users/${userId}/categories`, { throwHttpErrors: false });
    t.is(response.statusCode, 404);
    t.is(response.body.message, "not found");
});

// Response 400, bad Request (for float user id 43.8)
test("GET /users/{userId}/categories returns 400 because userId was float", async (t) => {
    const userId = 43.8;
    const response = await t.context.got(`users/${userId}/categories`, { throwHttpErrors: false });
    t.is(response.statusCode, 400);
    t.is(response.body.message, "request.params.userId should be integer");
});