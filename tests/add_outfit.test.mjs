import http from "node:http";
import test from "ava";
import got from "got";
import app from "../index.js";
import { generateRandomID } from "../utils/random_id.js";

import { validOutfit, invalidOutfit } from "../utils/outfits.js";

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

// 201 new resource created, also returns the outfit user created
test("POST /users/{userId}/outfits returns 201 and the Outfit the user adds", async (t) => {
  const userId = generateRandomID(0, 120); // example id
  const response = await t.context.got.post(`users/${userId}/outfits`, { throwHttpErrors: false,
    json: validOutfit
 });
  t.is(response.statusCode, 201);
  t.deepEqual(response.body, validOutfit);
});

// 404 userId > 120
test("POST /users/{userId}/outfits returns 404, user doesn't exist", async (t) => {
  const userId = generateRandomID(1, 120) + 120;
  const response = await t.context.got.post(`users/${userId}/outfits`, { throwHttpErrors: false,
    json: validOutfit
 });
  t.is(response.statusCode, 404);
  t.is(response.body, "User doesn't exist");
});

// 404 userId not given
test("POST /users/{userId}/outfits returns 404, userId not given", async (t) => {
  const userId = "";
  const response = await t.context.got.post(`users/${userId}/outfits`, { throwHttpErrors: false,
    json: validOutfit
 });
  t.is(response.statusCode, 404);
  t.is(response.body.message, "not found");
});

// 400 userId not integer
test("POST /users/{userId}/outfits returns 400, userId must be integer", async (t) => {
  const userId = "asd";
  const response = await t.context.got.post(`users/${userId}/outfits`, { throwHttpErrors: false,
    json: validOutfit
 });
  t.is(response.statusCode, 400);
  t.is(response.body.message, "request.params.userId should be integer");
});

// 400 outfit missing properties
test("POST /users/{userId}/outfits returns 400, outfit missing properties", async (t) => {
  const userId = generateRandomID(1, 120);
  const response = await t.context.got.post(`users/${userId}/outfits`, { throwHttpErrors: false,
    json: invalidOutfit
 });
  t.is(response.statusCode, 400);
  t.is(response.body.message, "request.body should have required property 'name'");
});