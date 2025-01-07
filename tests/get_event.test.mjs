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

/*
Event has date:integer, day:string ,month:integer, title:string ,Outfit
Outfit has name:string, and an array of Garment
Garment has name:string, size:string, brand:string, imagePath:string
*/

// Say app has ~100 users so any ID above 120 doesn't exist
// SOME TESTS ABOUT THE USERID MIGHT BE IGNORED AS THESE WERE TESTED IN GET_CALENDAR AND ADD_EVENT (FOR ASSIGNMENT PURPOSES)

// 200 code, userId, date, eventName given all correctly
test("GET users/{userId}/calendar/{date}/{eventName} returns correct response and status code", async (t) => {
    const userId = generateRandomID(1, 120);
    const date = "12-01"; // date given in string format MM-DD, format is forced by pattern in openapi.yaml, explained in the end of the file as well
    const date_array = date.split("-").map(Number); // make array [MM, DD]
    const eventName = "Morning Walk";
    const response = await t.context.got(`users/${userId}/calendar/${date}/${eventName}`, { throwHttpErrors: false });
    t.is(response.statusCode, 200);
    t.is(response.body.body.title, eventName);
    t.is(response.body.body.month, date_array[0]);
    t.is(response.body.body.date, date_array[1]);
});

// 404 because date and event-name dont match
test("GET users/{userId}/calendar/{date}/{eventName} returns 404 date,name dont match", async (t) => {
    const userId = generateRandomID(1, 120);
    const date = "11-01"; // date given in string format MM-DD
    const eventName = "Morning Walk";
    const response = await t.context.got(`users/${userId}/calendar/${date}/${eventName}`, { throwHttpErrors: false });
    t.is(response.statusCode, 404);
    t.is(response.body, "Cannot find event, date and name don't match");
});

// 404 because eventName doesnt exist
test("GET users/{userId}/calendar/{date}/{eventName} returns 404 name doesnt exist", async (t) => {
    const userId = generateRandomID(1, 120);
    const date = "12-01"; // date given in string format MM-DD
    const eventName = "AfternoonWalk";
    const response = await t.context.got(`users/${userId}/calendar/${date}/${eventName}`, { throwHttpErrors: false });
    t.is(response.statusCode, 404);
    t.is(response.body, "Event name doesn't exist");
});

// 404 because userId > 120
test("GET users/{userId}/calendar/{date}/{eventName} returns 404 user doesn't exist", async (t) => {
    const userId = generateRandomID(1, 120) + 120;
    const date = "12-01"; // date given in string format MM-DD
    const eventName = "Morning Walk";
    const response = await t.context.got(`users/${userId}/calendar/${date}/${eventName}`, { throwHttpErrors: false });
    t.is(response.statusCode, 404);
    t.is(response.body, "User doesn't exist");
});

// 400 bad request userId not integer
test("GET users/{userId}/calendar/{date}/{eventName} returns 400 because userId is not integer", async (t) => {
    const userId = "asd";
    const date = "12-01";
    const eventName = "Morning Walk";
    const response = await t.context.got(`users/${userId}/calendar/${date}/${eventName}`, { throwHttpErrors: false });
    t.is(response.statusCode, 400);
    t.is(response.body.message, 'request.params.userId should be integer');
});

// 404 not found because eventName was not given
test("GET users/{userId}/calendar/{date}/{eventName} returns 404 eventName not given", async (t) => {
    const userId = generateRandomID(1, 120);
    const date = "12-01"; // date given in string format MM-DD
    const eventName = "";
    const response = await t.context.got(`users/${userId}/calendar/${date}/${eventName}`, { throwHttpErrors: false });
    t.is(response.statusCode, 404);
    t.is(response.body.message, "not found");
});

// 400 bad request because date in wrong format
test("GET users/{userId}/calendar/{date}/{eventName} returns 400 wrong date format", async (t) => {
    const userId = generateRandomID(1, 120);
    const wrongDates = ["12",12,"asd","aa-aa","aa-12","13-12","2-30","0-0"]; // examples that dont match the pattern we pick one random (all have been tested)
    const choice = generateRandomID(0, wrongDates.length);
    const date = wrongDates[choice];
    const eventName = "Morning Walk";
    const response = await t.context.got(`users/${userId}/calendar/${date}/${eventName}`, { throwHttpErrors: false });
    t.is(response.statusCode, 400);
    t.is(response.body.message, 'request.params.date should match pattern "^(?:(0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|02-(0[1-9]|1[0-9]|2[0-8]))$"');
});

/* The pattern validates dates in the MM-DD format, ensuring:
1. Months with 31 days:
    - Matches months 01 (January), 03 (March), 05 (May), 07 (July), 08 (August), 10 (October), 12 (December).
    - Valid days for these months are 01-31.
2. Months with 30 days:
    - Matches months 04 (April), 06 (June), 09 (September), 11 (November).
    - Valid days for these months are 01-30.
3. February with 28 days(no leap years):
    - Matches February (02) with valid days 01-28.
The regular expression structure:
 - ^: Asserts the start of the string.
 - ( ... ): Grouping to organize the validation.
 - 0[13578]|1[02]: Matches months with 31 days.
 - 0[1-9]|[12][0-9]|3[01]: Matches valid days for months with 31 days.
 - 0[469]|11: Matches months with 30 days.
 - 0[1-9]|[12][0-9]|30: Matches valid days for months with 30 days.
 - 02-(0[1-9]|1[0-9]|2[0-8]): Matches February (02) with valid days 01-28.
 - $: Asserts the end of the string. */