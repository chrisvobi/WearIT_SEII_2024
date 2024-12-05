import http from "node:http";
import test from "ava";
import got from "got";
import app from "../index.js";
import { getCategories } from "../controllers/Category.js";


test.before(async (t) => {
	t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
	t.context.server.close();
});

// Response 200, it worked (for user id 45)
test("GET /users/{user-id}/categories returns correct response and status code", async (t) => {
	const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await getCategories(null, response, null, 45);
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 200);
    t.is(parsedBody.body[0].name, "Jackets");
    t.is(parsedBody.body[1].name, "Tops");
});

// Response 404, user not found (for user id 145)
test("GET /users/{user-id}/categories returns 404 because userId doesn't exist", async (t) => {
	const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await getCategories(null, response, null, 145);
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 404);
    t.is(parsedBody.body, "User doesn't exist");
});

// Response 400, bad request (for user id -3)
test("GET /users/{user-id}/categories returns 400 because userId < 1", async (t) => {
	const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await getCategories(null, response, null, -3);
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 400);
    t.is(parsedBody.body, "User Id should be greater than 1");
});


// Response 400, bad request (for user id mpampis)
test("GET /users/{user-id}/categories returns 400 because userId was not integer", async (t) => {
	const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await getCategories(null, response, null, "mpampis");
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 400);
    t.is(parsedBody.body, "User Id should be integer");
});

