import http from "node:http";
import test from "ava";
import got from "got";
import app from "../index.js";
import { addUserCalendarEvent } from "../controllers/Calendar.js";
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

const correctEvent = { // dummy event user wants to add to calendar
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

// 201 new resource created, also returns the event user created
test("POST /users/{user-id}/calendar returns 200 and the Event the user adds", async (t) => {
    const userId = generateRandomID(1, 120);
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await addUserCalendarEvent(null, response, null, correctEvent, userId);
    const parsedBody = JSON.parse(response.body);
	t.is(parsedBody.statusCode, 201);
    t.deepEqual(parsedBody.message, correctEvent);
});

// 404 userId > 120
test("POST /users/{user-id}/calendar returns 404, user doesn't exist", async (t) => {
  const userId = generateRandomID(1, 120) + 120;
  const response = {
      writeHead: (statusCode, headers) => {},
      end: (body) => {response.body = body;}};
  await addUserCalendarEvent(null, response, null, correctEvent, userId);
  const parsedBody = JSON.parse(response.body);
  t.is(parsedBody.statusCode, 404);
  t.is(parsedBody.message, "User doesn't exist");
});

// 400 userId not integer
test("POST /users/{user-id}/calendar returns 400, userId must be integer", async (t) => {
  const userId = "asd";
  const response = {
      writeHead: (statusCode, headers) => {},
      end: (body) => {response.body = body;}};
  await addUserCalendarEvent(null, response, null, correctEvent, userId);
  const parsedBody = JSON.parse(response.body);
  t.is(parsedBody.statusCode, 400);
  t.is(parsedBody.message, "UserId should be integer");
});

// 400 event given in wrong format
test("POST /users/{user-id}/calendar returns 400, event invalid", async (t) => {
  const userId = generateRandomID(1, 120);
  const choice = generateRandomID(0,3); // random int 0-2
  const response = {
      writeHead: (statusCode, headers) => {},
      end: (body) => {response.body = body;}};
  await addUserCalendarEvent(null, response, null, falseEvents[choice], userId);
  const parsedBody = JSON.parse(response.body);
  t.is(parsedBody.statusCode, 400);
  t.is(parsedBody.message, "Event object not given correctly");
});