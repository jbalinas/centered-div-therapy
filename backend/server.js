const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Chat Route (Commented Out)
/*
app.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post('http://127.0.0.1:5002/chat', { message });
        res.status(200).send({ reply: response.data.reply });
    } catch (error) {
        console.error('Error from local LLM server:', error.message);
        res.status(500).send({ error: 'Failed to fetch AI response from the local LLM server.' });
    }
});
*/

// Temporary Response
app.get('/chat', (req, res) => {
    res.status(200).send({ reply: 'Chat functionality is disabled.' });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
