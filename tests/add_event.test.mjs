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

const correctEvent = { // dummy event user wants to add to calendar
  "date" : 2,
  "day" : "Monday",
  "month" : 12,
  "title" : "Afternoon Coffee",
  "planndedOutfit" :  {
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
  },
};

const falseEvent = {
  "date" : 2,
  "day" : "Monday",
  "title" : "Afternoon Coffee",
  "planndedOutfit" :  [{
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
  }] ,
};

// 200 new resource created, also returns the event user created
test("POST /users/{userId}/calendar returns 200 and the Event the user adds", async (t) => {
  const userId = generateRandomID(1, 120);
  const response = await t.context.got.post(`users/${userId}/calendar`, { throwHttpErrors: false,
    json: correctEvent
 });
  t.is(response.statusCode, 200);
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

// 404 userId > 120
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