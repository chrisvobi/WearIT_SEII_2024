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
// Some tests might be ignored here (for assignment purposes) as they were tested in other files

// 200 resource deleted successfully and a success message
test("DELETE users/{userId}/outfits/{name} returns 200", async (t) => {
    const userId = generateRandomID(1, 120);
    const name = "CoffeeDate";
    const response = await t.context.got.delete(`users/${userId}/outfits/${name}`, { throwHttpErrors: false });
	t.is(response.statusCode, 200);
    t.is(response.body.body, "Outfit deleted successfully")
});

// 404 because name doesnt exist or user doesn't have any events saved
test("DELETE users/{userId}/outfits/{name} returns 404 name doesnt exist", async (t) => {
    const userId = generateRandomID(1, 120);
    const name = "AfternoonDate";
    const response = await t.context.got.delete(`users/${userId}/outfits/${name}`, { throwHttpErrors: false });
    t.is(response.statusCode, 404);
    t.is(response.body, "Outfit with this name doesn't exist");
});

// 405 method not allowed because name was not given
// tries to delete users/{userId}/outfits which only allows post method
// could be a test for users/{userId}/outfits endpoint
test("DELETE users/{userId}/outfits/{name} returns 405 name was not given", async (t) => {
    const userId = generateRandomID(1, 120);
    const name = "";
    const response = await t.context.got.delete(`users/${userId}/outfits/${name}`, { throwHttpErrors: false });
    t.is(response.statusCode, 405);
    t.is(response.body.message, "DELETE method not allowed");
});

// 404 because userId > 120 (say we have no more users than 120)
test("DELETE users/{userId}/outfits/{name} returns 404 user was not found", async (t) => {
    const userId = generateRandomID(1, 120) + 120;
    const name = "CoffeeDate";
    const response = await t.context.got.delete(`users/${userId}/outfits/${name}`, { throwHttpErrors: false });
    t.is(response.statusCode, 404);
    t.is(response.body, "User doesn't exist");
});

// 400 userId not integer
test("DELETE users/{userId}/outfits/{name} returns 400 userId must be integer", async (t) => {
    const userId = generateRandomID(1, 120) + 0.5; // random float
    const name = "CoffeeDate";
    const response = await t.context.got.delete(`users/${userId}/outfits/${name}`, { throwHttpErrors: false });
    t.is(response.statusCode, 400);
    t.is(response.body.message, "request.params.userId should be integer");
});

// 400 userId < 1
test("DELETE users/{userId}/outfits/{name} returns 400 userId must be > 1", async (t) => {
    const userId = generateRandomID(-100, 0);
    const name = "CoffeeDate";
    const response = await t.context.got.delete(`users/${userId}/outfits/${name}`, { throwHttpErrors: false });
    t.is(response.statusCode, 400);
    t.is(response.body.message, "request.params.userId should be >= 1");
});