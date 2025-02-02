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

// ~120 users

// MOST TESTS ABOUT USERID, DATE, EVENTNANE MIGHT BE IGNORED AS THESE WERE TESTED IN GET_CALENDAR, ADD_EVENT, GET_EVENT(the logic behind is the same) 
// (for assignment purposes)!!

import {correctEvent, falseEvent, falseEvent2} from "../utils/events.js";

// 200 resource updated, also returns the new event (user edited) == happy path
test("PUT users/{userId}/calendar/{date}/{eventName} returns 200 and the new Event", async (t) => {
  const userId = generateRandomID(1, 120);
  const eventName = "Morning Walk";
  const date = "12-01"; // date given in string format MM-DD
  const response = await t.context.got.put(`users/${userId}/calendar/${date}/${eventName}`, {
    throwHttpErrors: false,
    json: correctEvent
  });
  t.is(response.statusCode, 200);
  t.deepEqual(response.body.body, correctEvent);
});

// 404 because date and event-name dont match
test("PUT users/{userId}/calendar/{date}/{eventName} returns 404 date,name dont match", async (t) => {
  const userId = generateRandomID(1, 120);
  const date = "11-01"; // date given in string format MM-DD
  const eventName = "Morning Walk";
  const response = await t.context.got.put(`users/${userId}/calendar/${date}/${eventName}`, {
    throwHttpErrors: false,
    json: correctEvent
  });
  t.is(response.statusCode, 404);
  t.is(response.body, "Cannot find event, date and name don't match");
});

// 404 because event-name doesnt exist or user doesn't have any events saved
test("PUT users/{userId}/calendar/{date}/{eventName} returns 404 name doesnt exist", async (t) => {
  const userId = generateRandomID(1, 120);
  const date = "12-01"; // date given in string format MM-DD
  const eventName = "AfternoonWalk";
  const response = await t.context.got.put(`users/${userId}/calendar/${date}/${eventName}`, {
    throwHttpErrors: false,
    json: correctEvent
  });
  t.is(response.statusCode, 404);
  t.is(response.body, "Event name doesn't exist");
});

// 404 not found because eventName was not given
test("PUT users/{userId}/calendar/{date}/{eventName} returns 400 eventName not given", async (t) => {
  const userId = generateRandomID(1, 120);
  const date = "12-01"; // date given in string format MM-DD
  const eventName = "";
  const response = await t.context.got.put(`users/${userId}/calendar/${date}/${eventName}`, { throwHttpErrors: false,
    json: correctEvent
   });
  t.is(response.statusCode, 404);
  t.is(response.body.message, "not found");
});

// 404 because userId > 120
test("PUT users/{userId}/calendar/{date}/{eventName} returns 404 user doesn't exist", async (t) => {
  const userId = generateRandomID(1, 120) + 120;
  const date = "12-01"; // date given in string format MM-DD
  const eventName = "Morning Walk";
  const response = await t.context.got.put(`users/${userId}/calendar/${date}/${eventName}`, { throwHttpErrors: false,
    json: correctEvent
   });
  t.is(response.statusCode, 404);
  t.is(response.body, "User doesn't exist");
});

// 400 bad request userId not integer
test("PUT users/{userId}/calendar/{date}/{eventName} returns 400 because userId is not integer", async (t) => {
  const userId = "asd";
  const date = "12-01";
  const eventName = "Morning Walk";
  const response = await t.context.got.put(`users/${userId}/calendar/${date}/${eventName}`, { throwHttpErrors: false,
    json: correctEvent
   });
  t.is(response.statusCode, 400);
  t.is(response.body.message, 'request.params.userId should be integer');
});

// 400 event(the one i want to add/update with) given in wrong format
test("PUT /users/{userId}/calendar/{eventName} returns 400, event invalid", async (t) => {
  const userId = generateRandomID(1, 120);
  const eventName = "Morning Walk";
  const date = "12-01"; // date given in string format MM-DD
  const response = await t.context.got.put(`users/${userId}/calendar/${date}/${eventName}`, {
    throwHttpErrors: false,
    json: falseEvent
  });
  t.is(response.statusCode, 400);
  t.is(response.body.message, "request.body.planndedOutfit should be object");
});

// 400 event(the one i want to add/update with) given in wrong format (missing properties)
test("PUT /users/{userId}/calendar/{eventName} returns 400, event missing properties", async (t) => {
  const userId = generateRandomID(1, 120);
  const eventName = "Morning Walk";
  const date = "12-01"; // date given in string format MM-DD
  const response = await t.context.got.put(`users/${userId}/calendar/${date}/${eventName}`, {
    throwHttpErrors: false,
    json: falseEvent2
  });
  t.is(response.statusCode, 400);
  t.is(response.body.message, "request.body should have required property 'month'");
});


// 400 bad request because date in wrong format
test("PUT users/{userId}/calendar/{date}/{eventName} returns 400 wrong date format", async (t) => {
  const userId = generateRandomID(1, 120);
  const wrongDates = ["12",12,"asd","aa-aa","aa-12","13-12","2-30","0-0","2-30"]; // examples that dont match the pattern we pick one random (all have been tested)
  const choice = generateRandomID(0, wrongDates.length);
  const date = wrongDates[choice];
  const eventName = "Morning Walk";
  const response = await t.context.got.put(`users/${userId}/calendar/${date}/${eventName}`, {
    throwHttpErrors: false,
    json: correctEvent
  });
  t.is(response.statusCode, 400);
  t.is(response.body.message, 'request.params.date should match pattern "^(?:(0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|02-(0[1-9]|1[0-9]|2[0-8]))$"');
});
// pattern of date is explained in the end of the file get_event.test.mjs