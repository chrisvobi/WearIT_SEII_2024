import http from "node:http";
import test from "ava";
import got from "got";
import app from "../index.js";
import { addGarment } from "../controllers/Category.js";


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

// Response 200, it worked, successfully added garment to category
test("POST /users/{user-id}/categories/{category-name}/garments with a correct garment", async (t) => {
	const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    const garment = {
        "size" : "M",
        "imagePath" : "../images/45/Grey_Crewneck.jpeg",
        "name" : "Grey Crewneck",
        "brand" : "Zara"
    };
    await addGarment(null, response, null, garment, 45, "Tops");
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 201);
    t.is(parsedBody.body.name, "Grey Crewneck");
});

// Response 400, bad request, user doesn't exist
test("POST /users/{user-id}/categories/{category-name}/garments with incorrect user id", async (t) => {
	const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    const garment = {
        "size" : "M",
        "imagePath" : "../images/45/Grey_Crewneck.jpeg",
        "name" : "Grey Crewneck",
        "brand" : "Zara"
    };
    await addGarment(null, response, null, garment, 145, "Tops");
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 400);
    t.is(parsedBody.body, "User doesn't exist");
});


// Response 409, conflict, garment with given name already exists in the category
test("POST /users/{user-id}/categories/{category-name}/garments with garment name that exists", async (t) => {
	const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    const garment = {
        "size" : "M",
        "imagePath" : "../images/45/Black Hoodie.jpeg",
        "name" : "Black Hoodie",
        "brand" : "Zara"
    };
    await addGarment(null, response, null, garment, 45, "Tops");
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 409);
    t.is(parsedBody.body, "Garment with given name already exists");
});

// Response 400, bad request, garment given in wrong format (int instead of string)
test("POST /users/{user-id}/categories/{category-name}/garments with garment that has an integer instead of string", async (t) => {
	const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    const garment = {
        "size" : 45,
        "imagePath" : "../images/45/Black Hoodie.jpeg",
        "name" : "Black Hoodie",
        "brand" : "Zara"
    };
    await addGarment(null, response, null, garment, 45, "Tops");
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 400);
    t.is(parsedBody.body, "Garment object not given correctly");
});

// Response 400, bad request, garment given in wrong format (missing field)
test("POST /users/{user-id}/categories/{category-name}/garments with garment that misses size field", async (t) => {
	const response = {
        writeHead: (statusCode, headers) => {},
        end: (body) => {response.body = body;}};
    const garment = {
        "imagePath" : "../images/45/Black Hoodie.jpeg",
        "name" : "Black Hoodie",
        "brand" : "Zara"
    };
    await addGarment(null, response, null, garment, 45, "Tops");
    const parsedBody = JSON.parse(response.body);
    t.is(parsedBody.statusCode, 400);
    t.is(parsedBody.body, "Garment object not given correctly");
});