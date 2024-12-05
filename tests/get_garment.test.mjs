import http from "node:http";
import test from "ava";
import got from "got";
import app from "../index.js";
import { getGarment } from "../controllers/Garment.js";


test.before(async (t) => {
	t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
	t.context.server.close();
});

// Only simple userid and category checks here, they have been implemented more extensivly in get_categories.test.mjs

// Response 200, it worked, user 45 gets Black Hoodie from Tops category
test("GET /users/{user-id}/categories/{category-name}/garments/{name} returns correct response and status for user 45", async (t) => {
	const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await getGarment(null, response, null, 45, "Tops", "Black Hoodie");
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 200);
    t.is(parsedBody.body.name, "Black Hoodie");
    t.is(parsedBody.body.imagePath, "../images/45/Black_Hoodie.jpeg");
});

// Response 200, it worked, user 57 gets White Airforce Shoes from Shoes category
test("GET /users/{user-id}/categories/{category-name}/garments/{name} returns correct response and status for user 57", async (t) => {
	const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await getGarment(null, response, null, 57, "Shoes", "White Airforce Shoes");
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 200);
    t.is(parsedBody.body.name, "White Airforce Shoes");
    t.is(parsedBody.body.imagePath, "../images/57/White_Airforce_Shoes.jpeg");
});

// Response 400, bad request, user doesn't exist
test("GET /users/{user-id}/categories/{category-name}/garments/{name} returns bad request because of incorrect user id", async (t) => {
	const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await getGarment(null, response, null, 145, "Tops", "Black Hoodie");
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 400);
    t.is(parsedBody.body, "User doesn't exist");
});

// Response 400, bad request, category doesn't exist
test("GET /users/{user-id}/categories/{category-name}/garments/{name} returns bad request because of incorrect category", async (t) => {
	const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await getGarment(null, response, null, 45, "TopS", "Black Hoodie");
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 400);
    t.is(parsedBody.body, "Category doesn't exist");
});

// Response 400, bad request, garment doesn't exist
test("GET /users/{user-id}/categories/{category-name}/garments/{name} returns bad request because of incorrect garment name", async (t) => {
	const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await getGarment(null, response, null, 45, "Tops", "Balck Hoodie");
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 400);
    t.is(parsedBody.body, "Garment doesn't exist");
});