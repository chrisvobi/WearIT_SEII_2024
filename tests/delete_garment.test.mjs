import http from "node:http";
import test from "ava";
import got from "got";
import app from "../index.js";
import { deleteGarment } from "../controllers/Garment.js";


test.before(async (t) => {
	t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
	t.context.server.close();
});

// Checks for extensive user id testing and correct category names have already been implemented in other files

// Response 200, it worked, successfully deleted garment in a category
test("DELETE /users/{user-id}/categories/{category-name}/garments/{name} successfully deletes a garment", async (t) => {
	const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await deleteGarment(null, response, null, 45, "Tops", "Grey Crewneck");
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 200);
    t.is(parsedBody.body, "Garment deleted successfully");
});

// Response 400, bad request, garment name doesn't exist 
test("DELETE /users/{user-id}/categories/{category-name}/garments/{name} bad request, name doesn't exist", async (t) => {
	const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await deleteGarment(null, response, null, 45, "Tops", "GreY Crewneck");
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 400);
    t.is(parsedBody.body, "Garment doesn't exist");
});

// Response 400, bad request, user doesn't exist
test("DELETE /users/{user-id}/categories/{category-name}/garments/{name} returns bad request because of incorrect user id", async (t) => {
	const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await deleteGarment(null, response, null, 145, "Tops", "Black Hoodie");
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 400);
    t.is(parsedBody.body, "User doesn't exist");
});

// Response 400, bad request, category doesn't exist
test("DELETE /users/{user-id}/categories/{category-name}/garments/{name} returns bad request because of incorrect category", async (t) => {
	const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    await deleteGarment(null, response, null, 45, "TopS", "Black Hoodie");
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 400);
    t.is(parsedBody.body, "Category doesn't exist");
});