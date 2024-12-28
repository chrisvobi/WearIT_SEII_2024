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

// Say app has ~100 users so any ID above 120 doesn't exist

import {correctEvent, falseEvent, falseEvent2} from "../utils/events.js";

// 201 new resource created, also returns the event user created
test("POST /users/{userId}/calendar returns 201 and the Event the user adds", async (t) => {
  const userId = generateRandomID(1, 120);
  const response = await t.context.got.post(`users/${userId}/calendar`, { throwHttpErrors: false,
    json: correctEvent
 });
  t.is(response.statusCode, 201);
  t.deepEqual(response.body, correctEvent);
});

// 404 userId > 120
test("POST /users/{userId}/calendar returns 404, user doesn't exist", async (t) => {
  const userId = generateRandomID(1, 120) + 120;
  const response = await t.context.got.post(`users/${userId}/calendar`, { throwHttpErrors: false,
    json: correctEvent
 });
  t.is(response.statusCode, 404);
  t.is(response.body, "User doesn't exist");
});

// 404 userId not given
test("POST /users/{userId}/calendar returns 404, userId not given", async (t) => {
  const userId = "";
  const response = await t.context.got.post(`users/${userId}/calendar`, { throwHttpErrors: false,
    json: correctEvent
 });
  t.is(response.statusCode, 404);
  t.is(response.body.message, "not found");
});

// 400 userId not integer
test("POST /users/{userId}/calendar returns 400, userId must be integer", async (t) => {
  const userId = "asd";
  const response = await t.context.got.post(`users/${userId}/calendar`, { throwHttpErrors: false,
    json: correctEvent
 });
  t.is(response.statusCode, 400);
  t.is(response.body.message, "request.params.userId should be integer");
});

// 400 event given in wrong format
test("POST /users/{userId}/calendar returns 400, event invalid", async (t) => {
  const userId = generateRandomID(1, 120);
  const response = await t.context.got.post(`users/${userId}/calendar`, { throwHttpErrors: false,
    json: falseEvent
 });
  t.is(response.statusCode, 400);
  t.is(response.body.message, "request.body.planndedOutfit should be object");
});

// 400 event missing properties
test("POST /users/{userId}/calendar returns 400, event missing properties", async (t) => {
  const userId = generateRandomID(1, 120);
  const response = await t.context.got.post(`users/${userId}/calendar`, { throwHttpErrors: false,
    json: falseEvent2
 });
  t.is(response.statusCode, 400);
  t.is(response.body.message, "request.body should have required property 'month'");
});