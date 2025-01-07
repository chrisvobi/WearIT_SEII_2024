import http from "node:http";
import test from "ava";
import got from "got";
import app from "../index.js";
import { generateRandomID } from "../utils/random_id.js";

import { validOutfit, invalidOutfit } from "../utils/outfits.js"; //  valid and invalid outfits user tries to post

test.before(async (t) => {
	t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
	t.context.server.close();
});

//  App has ~120 users. any id above 120 doesn't exist (no registered user yet)
//  Some tests might be ignored here (for assignment purposes) as they were tested in other files
 
// 200 resource updated, also returns the new outfit (user edited) == happy path
test("PUT users/{userId}/outfits/{name} returns 200 and the new Outfit", async (t) => {
    const userId = generateRandomID(1, 120);
    const name = "CoffeeDate";
    const response = await t.context.got.put(`users/${userId}/outfits/${name}`, {
      throwHttpErrors: false,
      json: validOutfit
    });
    t.is(response.statusCode, 200);
    t.deepEqual(response.body.body, validOutfit);
});

// 404 because name doesnt exist or user doesn't have any outfits saved
test("PUT users/{userId}/outfits/{name} returns 404 name doesnt exist", async (t) => {
    const userId = generateRandomID(1, 120);
    const name = "AfternoonWalk";
    const response = await t.context.got.put(`users/${userId}/outfits/${name}`, {
      throwHttpErrors: false,
      json: validOutfit
    });
    t.is(response.statusCode, 404);
    t.is(response.body, "Outfit with this name doesn't exist");
});

// 405 method not allowed because name was not given
// tries to put users/{userId}/outfits which only allows post method
// could be a test for users/{userId}/outfits endpoint
test("PUT users/{userId}/outfits/{name} returns 405 name not given", async (t) => {
    const userId = generateRandomID(1, 120);
    const name = "";
    const response = await t.context.got.put(`users/${userId}/outfits/${name}`, { throwHttpErrors: false,
      json: validOutfit
     });
    t.is(response.statusCode, 405);
    t.is(response.body.message, "PUT method not allowed");
});

// 400 bad request userId not integer
test("PUT users/{userId}/outfits/{name} returns 400 because userId is not integer", async (t) => {
    const userId = "asd";
    const name = "CoffeeDate";
    const response = await t.context.got.put(`users/${userId}/outfits/${name}`, { throwHttpErrors: false,
        json: validOutfit
    });
    t.is(response.statusCode, 400);
    t.is(response.body.message, 'request.params.userId should be integer');
});

// 400 outfit(the one i want to add/update with) given in wrong format (missing properties)
test("PUT users/{userId}/outfits/{name} returns 400, outfit missing properties", async (t) => {
    const userId = generateRandomID(1, 120);
    const name = "CoffeeDate";
    const response = await t.context.got.put(`users/${userId}/outfits/${name}`, { throwHttpErrors: false,
        json: invalidOutfit
    });
    t.is(response.statusCode, 400);
    t.is(response.body.message, "request.body should have required property 'name'");
});