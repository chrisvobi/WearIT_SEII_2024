import http from "node:http";
import test from "ava";
import got from "got";
import app from "../index.js";
import { updateUserCalendarEvent } from "../controllers/Calendar.js";
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

// most tests about userId, date, eventName have already been tested in get_calendar, add_event, get_event so they dont get included here (the logic behind is the same) 
// (for assignment purposes)

const correctEvent = { // dummy event user wants to update with in calendar
    "date" : 2,
    "day" : "Monday",
    "month" : 12,
    "title" : "Afternoon Coffee",
    "planndedOutfit" : [ {
      "garments" : [ {
        "size" : "M",
        "imagePath" : "../images/CameraRoll/PIC04_12_01_2024.jpeg",
        "name" : "GreyCrewneck",
        "brand" : "Zara"
      }, {
        "size" : "M",
        "imagePath" : "../images/CameraRoll/PIC05_12_01_2024.jpeg",
        "name" : "BlackFormalPants",
        "brand" : "H&M"
      }, {
        "size" : "M",
        "imagePath" : "../images/CameraRoll/PIC06_12_01_2024.jpeg",
        "name" : "WhiteAirforceShoes",
        "brand" : "Nike"
      } ],
      "name" : "CoffeeDate"
    } ],
  };
  
  const falseEvents = [{ // list with couple events invalid format
    "date" : 2,
    "day" : "Monday",
    "title" : "Afternoon Coffee",
    "planndedOutfit" : [ {
      "garments" : [ {
        "size" : "M",
        "imagePath" : "../images/CameraRoll/PIC04_12_01_2024.jpeg",
        "name" : "GreyCrewneck",
        "brand" : "Zara"
      }, {
        "size" : "M",
        "imagePath" : "../images/CameraRoll/PIC05_12_01_2024.jpeg",
        "name" : "BlackFormalPants",
        "brand" : "H&M"
      }, {
        "size" : "M",
        "imagePath" : "../images/CameraRoll/PIC06_12_01_2024.jpeg",
        "name" : "WhiteAirforceShoes",
        "brand" : "Nike"
      } ],
      "name" : "CoffeeDate"
    } ],
  },{
    "planndedOutfit" : [ {
      "garments" : [ {
        "size" : "M",
        "imagePath" : "../images/CameraRoll/PIC04_12_01_2024.jpeg",
        "name" : "GreyCrewneck",
        "brand" : "Zara"
      }, {
        "size" : "M",
        "imagePath" : "../images/CameraRoll/PIC05_12_01_2024.jpeg",
        "name" : "BlackFormalPants",
        "brand" : "H&M"
      }, {
        "size" : "M",
        "imagePath" : "../images/CameraRoll/PIC06_12_01_2024.jpeg",
        "name" : "WhiteAirforceShoes",
        "brand" : "Nike"
      } ],
    } ],
  }, {
    "garments" : [ {
        "size" : "M",
        "imagePath" : "../images/CameraRoll/PIC04_12_01_2024.jpeg",
        "name" : "GreyCrewneck",
        "brand" : "Zara"
      }]
  }
  ];

// 200 resource updated, also returns the new event (user edited) == happy path
test("PUT users/{user-id}/calendar/{date}/{event-name} returns 200 and the new Event", async (t) => {
    const userId = generateRandomID(1, 120);
    const eventName = "Morning Walk";
    const dateStr = "12-01"; // date given in string format MM-DD
    const date = dateStr.split("-").map(Number);
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await updateUserCalendarEvent (null, response, null, correctEvent, userId, date, eventName);
    const parsedBody = JSON.parse(response.body);
	t.is(parsedBody.statusCode, 200);
    t.deepEqual(parsedBody.message, correctEvent);
});

// 404 because date and event-name dont match
test("PUT users/{user-id}/calendar/{date}/{event-name} returns 404 date,name dont match", async (t) => {
    const userId = generateRandomID(1, 120);
    const dateStr = "11-01"; // date given in string format MM-DD
    const date = dateStr.split("-").map(Number);
    const eventName = "Morning Walk";
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await updateUserCalendarEvent (null, response, null, correctEvent, userId, date, eventName);
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 404);
    t.is(parsedBody.body, "Cannot find event, date and name don't match");
});

// 404 because event-name doesnt exist or user doesn't have any events saved
test("PUT users/{user-id}/calendar/{date}/{event-name} returns 404 name doesnt exist", async (t) => {
    const userId = generateRandomID(1, 120);
    const dateStr = "12-01"; // date given in string format MM-DD
    const date = dateStr.split("-").map(Number);
    const eventName = "AfternoonWalk";
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await updateUserCalendarEvent (null, response, null, correctEvent, userId, date, eventName);
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 404);
    t.is(parsedBody.body, "Event name doesn't exist");
});

// 400 event(the one i want to add/update with) given in wrong format
test("PUT /users/{user-id}/calendar returns 400, event invalid", async (t) => {
    const userId = generateRandomID(1, 120);
    const choice = generateRandomID(0,3); // random int 0-2
    const eventName = "Morning Walk";
    const dateStr = "12-01"; // date given in string format MM-DD
    const date = dateStr.split("-").map(Number);
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await updateUserCalendarEvent (null, response, null, falseEvents[choice], userId, date, eventName);
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 400);
    t.is(parsedBody.message, "Event object not given correctly");
  });

// 400 bad request because date in wrong format
test("PUT users/{user-id}/calendar/{date}/{event-name} returns 400 wrong date format", async (t) => {
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
        await updateUserCalendarEvent (null, response, null, correctEvent, userId, date, eventName);
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 400);
    t.is(parsedBody.body, "Date given in wrong format");
});

// this test is the same as the previous one we add it to get 100 coverage on utils/correct_date.js
test("PUT users/{user-id}/calendar/{date}/{event-name} returns 400 specific wrong date format", async (t) => {
    const userId = generateRandomID(1, 120);
    const dateStr = "2-30"
    const date = dateStr.split("-").map(Number);
    const eventName = "Morning Walk";
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
        await updateUserCalendarEvent (null, response, null, correctEvent, userId, date, eventName);
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 400);
    t.is(parsedBody.body, "Date given in wrong format");
});