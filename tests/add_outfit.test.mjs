import http from "node:http";
import test from "ava";
import got from "got";
import app from "../index.js";
import { createOutfit } from "../controllers/Outfit.js";

const dummyOutfit = {
    "garments" : [ {
      "size" : "M",
      "imagePath" : "../images/CameraRoll/PIC01_12_01_2024.jpeg",
      "name" : "BlackHoodie",
      "brand" : "Nike"
    }, {
      "size" : "M",
      "imagePath" : "../images/CameraRoll/PIC02_12_01_2024.jpeg",
      "name" : "GreySweatpants",
      "brand" : "Nike"
    }, {
      "size" : "M",
      "imagePath" : "../images/CameraRoll/PIC03_12_01_2024.jpeg",
      "name" : "WhiteShoes",
      "brand" : "Converse"
    } ],
    "name" : "EverydayOutfit"
};


test.before(async (t) => {
	t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
	t.context.server.close();
});

test("POST /users/{user-id}/outfit returns 201 and the Outfit the user adds", async (t) => {
    const userId = 32;
    const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await createOutfit (null, response, null, dummyOutfit, userId);
    const parsedBody = JSON.parse(response.body);
	t.is(parsedBody.statusCode, 201);
    t.deepEqual(parsedBody.message, dummyOutfit);
});

test("POST /users/{user-id}/outfit returns 404 ", async (t) => {
  const userId = 1200;
  const response = {
      writeHead: (statusCode, headers) => {},
      end: (body) => {response.body = body;}};
  await createOutfit (null, response, null, dummyOutfit, userId);
  const parsedBody = JSON.parse(response.body);
  t.is(parsedBody.statusCode, 404);
  t.is(parsedBody.message, "User doesnt exist");
});