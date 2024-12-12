import http from "node:http";
import test from "ava";
import got from "got";
import app from "../index.js";


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
test("GET /users/{userId}/categories/{categoryName}/garments/{name} returns correct response and status for user 45", async (t) => {
    const userId = 45;
    const category = "Tops"
    const name = "Black Hoodie"
    const response = await t.context.got(`users/${userId}/categories/${category}/garments/${name}`, { throwHttpErrors: false });
    t.is(response.statusCode, 200);
    t.is(response.body.name, "Black Hoodie");
    t.is(response.body.imagePath, "../images/45/Black_Hoodie.jpeg")
});

// Response 200, it worked, user 57 gets White Airforce Shoes from Shoes category
test("GET /users/{userId}/categories/{categoryName}/garments/{name} returns correct response and status for user 57", async (t) => {
    const userId = 57;
    const category = "Shoes"
    const name = "White Airforce Shoes"
    const response = await t.context.got(`users/${userId}/categories/${category}/garments/${name}`, { throwHttpErrors: false });
    t.is(response.statusCode, 200);
    t.is(response.body.name, "White Airforce Shoes");
    t.is(response.body.imagePath, "../images/57/White_Airforce_Shoes.jpeg")
});

// Response 404, bad request, user doesn't exist
test("GET /users/{user-id}/categories/{category-name}/garments/{name} returns bad request because of incorrect user id", async (t) => {
	const userId = 145;
    const category = "Tops"
    const name = "Black Hoodie"
    const response = await t.context.got(`users/${userId}/categories/${category}/garments/${name}`, { throwHttpErrors: false });
    t.is(response.statusCode, 404);
    t.is(response.body, "User doesn't exist");
});

// Response 404, bad request, user doesn't exist
test("GET /users/{user-id}/categories/{category-name}/garments/{name} returns bad request because of negative user id", async (t) => {
	const userId = -3;
    const category = "Tops"
    const name = "Black Hoodie"
    const response = await t.context.got(`users/${userId}/categories/${category}/garments/${name}`, { throwHttpErrors: false });
    t.is(response.statusCode, 400);
    t.is(response.body.message, "request.params.userId should be >= 1");
});

// Response 400, bad request, category doesn't exist
test("GET /users/{user-id}/categories/{category-name}/garments/{name} returns bad request because of incorrect category", async (t) => {
	const userId = 45;
    const category = "TopS"
    const name = "Black Hoodie"
    const response = await t.context.got(`users/${userId}/categories/${category}/garments/${name}`, { throwHttpErrors: false });
    t.is(response.statusCode, 400);
    t.is(response.body.message, "request.params.categoryName should be equal to one of the allowed values: Jackets, Tops, Pants, Shoes, Accessories")
});

// Response 400, bad request, garment doesn't exist
test("GET /users/{user-id}/categories/{category-name}/garments/{name} returns bad request because of incorrect garment name", async (t) => {
	const userId = 45;
    const category = "Tops"
    const name = "Balck Hoodie"
    const response = await t.context.got(`users/${userId}/categories/${category}/garments/${name}`, { throwHttpErrors: false });
    t.is(response.statusCode, 404);
    t.is(response.body, "Garment doesn't exist");
});