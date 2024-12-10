import http from "node:http";
import test from "ava";
import got from "got";
import app from "../index.js";
import { generateRandomID } from "../utils/random_id.js";

test.before(async (t) => {
	t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    // const { port } = server.address();
	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:8080` });
});

test.after.always((t) => {
	t.context.server.close();
});

/*
Event has date:integer, day:string ,month:integer, title:string ,Outfit
Outfit has name:string, and an array of Garment
Garment has name:string, size:string, brand:string, imagePath:string
*/

// Say app has ~100 users so any ID above 120 doesn't exist

// Following test should return statusCode 200 and body should be an array of Events
test("GET /users/{userId}/calendar returns correct response and status code", async (t) => {
    var userId = generateRandomID(1,120);
    while (userId === 32) {
        userId = generateRandomID(1,120);
    }
    const response = await t.context.got(`users/${userId}/calendar`, { throwHttpErrors: false });
    t.is(response.statusCode, 200);
    t.is(response.body[0].day, "Sunday");
    t.is(response.body[1].title, "Afternoon Coffee");
});

 // Response 204 No Content. User exists but doesn't have anything in calendar (e.g for user with id 32)
 test("GET /users/{userId}/calendar returns 204 because User doesn't have anything in calendar", async (t) => {
    const userId = 32;
    const response = await t.context.got(`users/${userId}/calendar`, { throwHttpErrors: false });
    t.is(response.statusCode, 204);
    t.is(response.body, "");
});

 // Response 404 not found (userid > 120)
 test("GET /users/{userId}/calendar returns 404 because userId doesn't exist", async (t) => {
    const userId = generateRandomID(1, 120) + 120;
    const response = await t.context.got(`users/${userId}/calendar`, { throwHttpErrors: false });
    t.is(response.statusCode, 404);
    t.is(response.body, "User doesn't exist");
});

// Response 400 Bad Request
test("GET /users/{userId}/calendar returns 400 because userId < 1", async (t) => {
    const userId = generateRandomID(-100, 0);
    const response = await t.context.got(`users/${userId}/calendar`, { throwHttpErrors: false });
    t.is(response.statusCode, 400);
    t.is(response.body.message, "request.params.userId should be >= 1");
});

// Response 400 Bad Request
test("GET /users/{userId}/calendar returns 400 because userId was not integer", async (t) => {
    const userId = "asd";
    const response = await t.context.got(`users/${userId}/calendar`, { throwHttpErrors: false });
    t.is(response.statusCode, 400);
    t.is(response.body.message, "request.params.userId should be integer");
});