import http from "node:http";
import test from "ava";
import got from "got";
import app from "../index.js";
import { deleteUserCalendarEvent } from "../controllers/Calendar.js";
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
// there won't be any tests about the user-id as these were tested in get_calendar and add_event (for assignment purposes)
// most tests are similar to previous test files so we didnt include everything (for assignment purposes)


// 200 resource deleted successfully and a success message
test("DELETE users/{user-id}/calendar/{date}/{event-name} returns 200", async (t) => {
    const userId = generateRandomID(1, 120);
    const eventName = "Morning Walk";
    const dateStr = "12-01"; // date given in string format MM-DD
    const date = dateStr.split("-").map(Number);
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await deleteUserCalendarEvent (null, response, null, userId, date, eventName)
    const parsedBody = JSON.parse(response.body);
	t.is(parsedBody.statusCode, 200);
    t.is(parsedBody.message, "Event deleted successfully")
});

// 404 because date and event-name dont match
test("DELETE users/{user-id}/calendar/{date}/{event-name} returns 404 date,name dont match", async (t) => {
    const userId = generateRandomID(1, 120);
    const eventName = "Morning Walk";
    const dateStr = "11-01"; // date given in string format MM-DD
    const date = dateStr.split("-").map(Number);
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await deleteUserCalendarEvent (null, response, null, userId, date, eventName)
    const parsedBody = JSON.parse(response.body);
	t.is(parsedBody.statusCode, 404);
    t.is(parsedBody.message, "Cannot find event, date and name don't match")
});

// 404 because event-name doesnt exist or user doesn't have any events saved
test("DELETE users/{user-id}/calendar/{date}/{event-name} returns 404 name doesnt exist", async (t) => {
    const userId = generateRandomID(1, 120);
    const dateStr = "12-01"; // date given in string format MM-DD
    const date = dateStr.split("-").map(Number);
    const eventName = "AfternoonWalk";
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await deleteUserCalendarEvent (null, response, null, userId, date, eventName)
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 404);
    t.is(parsedBody.message, "Event name doesn't exist");
});

// 400 bad request because date in wrong format
test("DELETE users/{user-id}/calendar/{date}/{event-name} returns 400 wrong date format", async (t) => {
    const userId = generateRandomID(1, 120);
    const wrongDates = ["12",12,"asd","aa-aa","aa-12","13-12","2-30","0-0","2-30"]; // just some examples whole testing for date in utils/correct_date.js
    const choice = generateRandomID(0, wrongDates.length);
    const dateStr = wrongDates[choice];
    let date;
    try {date = dateStr.split("-").map(Number);}
    catch{date = dateStr;}
    const eventName = "Morning Walk";
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await deleteUserCalendarEvent (null, response, null, userId, date, eventName)
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 400);
    t.is(parsedBody.message, "Date given in wrong format");
});