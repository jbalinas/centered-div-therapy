const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Database = require('better-sqlite3');

const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Set up SQLite database
const db = new Database('data.db');
db.exec(`
    CREATE TABLE IF NOT EXISTS submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        input TEXT NOT NULL,
        timestamp TEXT NOT NULL
    )
`);

// // In-memory storage for submitted data
// const dataStore = [];

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the backend!');
});

app.post('/data', (req, res) => {
    const { input } = req.body;
    if (input) {
        const timestamp = new Date().toLocaleString();
        const stmt = db.prepare('INSERT INTO submissions (input, timestamp) VALUES (?, ?)');
        stmt.run(input, timestamp);
        res.status(200).send({ message: `Data received: ${input}` });
    } else {
        res.status(400).send({ message: 'Invalid input' });
    }
});

app.get('/data', (req, res) => {
    const stmt = db.prepare('SELECT * FROM submissions ORDER BY id DESC');
    const data = stmt.all();
    res.status(200).send(data);
});

// Handle invalid routes
app.use((req, res) => {
    res.status(404).send({ error: 'Route not found' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
