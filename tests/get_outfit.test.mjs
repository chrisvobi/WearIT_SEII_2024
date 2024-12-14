import http from "node:http";
import test from "ava";
import got from "got";
import app from "../index.js";
import { generateRandomID } from "../utils/random_id.js";

test.before(async (t) => {
	t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
	t.context.server.close();
});

// App has ~120 users. any id above 120 doesn't exist (no registered user yet)

// 200 code, userId, name given correctly
test("GET users/{userId}/outfits/{name} returns correct response and status code", async (t) => {
    const userId = generateRandomID(1, 120);
    const name = "CoffeeDate"
    const response = await t.context.got(`users/${userId}/outfits/${name}`, { throwHttpErrors: false });
    t.is(response.statusCode, 200);
    t.is(response.body.body.name, name);
});

// 404 because name doesnt exist
test("GET users/{userId}/outfits/{name} returns 404 name doesnt exist", async (t) => {
    const userId = generateRandomID(1, 120);
    const name = "AfternoonWalk";
    const response = await t.context.got(`users/${userId}/outfits/${name}`, { throwHttpErrors: false });
    t.is(response.statusCode, 404);
    t.is(response.body, "Outfit with this name doesn't exist");
});

// 404 because userId > 120
test("GET users/{userId}/outfits/{name} returns 404 user doesn't exist", async (t) => {
    const userId = generateRandomID(1, 120) + 120;
    const name = "CoffeeDate";
    const response = await t.context.got(`users/${userId}/outfits/${name}`, { throwHttpErrors: false });
    t.is(response.statusCode, 404);
    t.is(response.body, "User doesn't exist");
});

// 400 bad request userId not integer
test("GET users/{userId}/outfits/{name} returns 400 because userId is not integer", async (t) => {
    const userId = "asd";
    const name = "CoffeeDate";
    const response = await t.context.got(`users/${userId}/outfits/${name}`, { throwHttpErrors: false });
    t.is(response.statusCode, 400);
    t.is(response.body.message, 'request.params.userId should be integer');
});

// 405 method not allowed because name was not given
// tries to get users/{userId}/outfits which only allows post method
test("GET users/{userId}/outfits/{name} returns 405 name not given", async (t) => {
    const userId = generateRandomID(1, 120);
    const name = "";
    const response = await t.context.got(`users/${userId}/outfits/${name}`, { throwHttpErrors: false });
    t.is(response.statusCode, 405);
    t.is(response.body.message, "GET method not allowed");
});