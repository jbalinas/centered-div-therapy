const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Mock in-memory storage for testing
let dataStore = [];
app.post('/data', (req, res) => {
    const { input } = req.body;
    if (input) {
        const timestamp = new Date().toLocaleString();
        dataStore.push({ input, timestamp });
        res.status(200).send({ message: `Data received: ${input}` });
    } else {
        res.status(400).send({ message: 'Invalid input' });
    }
});

app.get('/data', (req, res) => {
    res.status(200).send(dataStore);
});

describe('API Tests', () => {
    test('POST /data should save input', async () => {
        const response = await request(app)
            .post('/data')
            .send({ input: 'Test data' });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Data received: Test data');
    });

    test('GET /data should return all submissions', async () => {
        const response = await request(app).get('/data');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
});
