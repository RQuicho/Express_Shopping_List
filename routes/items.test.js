process.env.NODE_ENV = "test";
const request = require('supertest');
const app = require('../app');
let items = require('../fakeDb');

let chips = { name: "chips", price: 1.25 };

beforeEach(() => {
    items.push(chips);
});

afterEach(() => {
    // clear array
    items.length = 0;
});


describe("GET /items", () => {
    test('Get all items', async () => {
        const res = await request(app).get('/items');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({items: [chips]});
    });
});

describe("GET /items/:name", () => {
    test('Get item by name', async () => {
        const res = await request(app).get(`/items/${chips.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({name: "chips", price: 1.25});
    });
    test('Responds with 404 for invalid item', async () => {
        const res = await request(app).get(`/items/donuts`);
        expect(res.statusCode).toBe(404);
    });
});

describe("POST /items", () => {
    test('Create an item', async () => {
        const res = await request(app).post('/items').send({name: "cookies", price: 2.00});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({added: {name: "cookies", price: 2.00}});
    });
    test('Respond with 400 if name is missing', async () => {
        const res = await request(app).post('/items').send({name: "", price: 1.00});
        expect(res.statusCode).toBe(400);
    });
    test('Respond with 400 if price is missing', async () => {
        const res = await request(app).post('/items').send({name: "gum", price: ""});
        expect(res.statusCode).toBe(400);
    });
});

describe("PATCH /items/:name", () => {
    test('Update an existing item', async () => {
        const res = await request(app).patch(`/items/${chips.name}`).send({name: "crackers", price: 1.50});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({updated: {name: "crackers", price: 1.50}});
    });
    test('Respond with 404 if invalid name', async () => {
        const res = await request(app).patch('/items/milk').send({name: "crackers", price: 1.50});
        expect(res.statusCode).toBe(404);
    });
});

describe("DELETE /items/:name", () => {
    test('Delete an existing item', async () => {
        const res = await request(app).delete(`/items/${chips.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message: "Deleted"});
    });
    test('Respond with 404 for deleting invalid item', async () => {
        const res = await request(app).delete('/items/peanuts');
        expect(res.statusCode).toBe(404);
    });
});