import http from "node:http";
import test from "ava";
import got from "got";
import app from "../index.js";
import { editGarment } from "../controllers/Garment.js";


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

// Response 200, it worked, successfully edited garment in a category
test("PUT /users/{user-id}/categories/{category-name}/garments/{name} with a correct data, change size", async (t) => {
	const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    const garment = {
        "size" : "L", // this is M in the database, edited to L
        "imagePath" : "../images/45/Grey_Crewneck.jpeg",
        "name" : "Grey Crewneck",
        "brand" : "Zara"
    };
    await editGarment(null, response, null, garment, 45, "Tops", "Grey Crewneck");
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 200);
    t.is(parsedBody.body.name, garment.name);
});

// Response 200, it worked, successfully edited garment in a category
test("PUT /users/{user-id}/categories/{category-name}/garments/{name} with a correct data, change name and path", async (t) => {
	const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    const garment = {
        "size" : "L", // this is M in the database, edited to L
        "imagePath" : "../images/45/Grey_Crewneck_with_hole.jpeg",
        "name" : "Grey Crewneck with hole",
        "brand" : "Zara"
    };
    await editGarment(null, response, null, garment, 45, "Tops", "Grey Crewneck");
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 200);
    t.is(parsedBody.body.name, garment.name);
});

// Response 409, conflict, edited garment already exists in the database
test("PUT /users/{user-id}/categories/{category-name}/garments/{name} already exists", async (t) => {
	const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    const garment = {
        "size" : "M", 
        "imagePath" : "../images/45/Grey_Crewneck.jpeg",
        "name" : "Grey Crewneck",
        "brand" : "Zara"
    };
    await editGarment(null, response, null, garment, 45, "Tops", "Grey Crewneck");
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 409);
    t.is(parsedBody.body, "Garment already exists");
});

// Response 400, bad request, name of garment to be edited doesn't exist
test("PUT /users/{user-id}/categories/{category-name}/garments/{name} with a wrong name", async (t) => {
	const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    const garment = {
        "size" : "L", // this is M in the database, edited to L
        "imagePath" : "../images/45/Grey_Crewneck.jpeg",
        "name" : "Grey Crewneck",
        "brand" : "Zara"
    };
    await editGarment(null, response, null, garment, 45, "Tops", "GreY Crewneck");
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 400);
    t.is(parsedBody.body, "Garment doesn't exist");
});

// Response 400, bad request, user doesn't exist
test("GET /users/{user-id}/categories/{category-name}/garments/{name} returns bad request because of incorrect user id", async (t) => {
	const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    const garment = {
        "size" : "L", // this is M in the database, edited to L
        "imagePath" : "../images/45/Grey_Crewneck.jpeg",
        "name" : "Grey Crewneck",
        "brand" : "Zara"
    };
    await editGarment(null, response, null, garment, 145, "Tops", "Black Hoodie");
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 400);
    t.is(parsedBody.body, "User doesn't exist");
});

// Response 400, bad request, category doesn't exist
test("GET /users/{user-id}/categories/{category-name}/garments/{name} returns bad request because of incorrect category", async (t) => {
	const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    const garment = {
        "size" : "L", // this is M in the database, edited to L
        "imagePath" : "../images/45/Grey_Crewneck.jpeg",
        "name" : "Grey Crewneck",
        "brand" : "Zara"
    };
    await editGarment(null, response, null, garment, 45, "TopS", "Black Hoodie");
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 400);
    t.is(parsedBody.body, "Category doesn't exist");
});