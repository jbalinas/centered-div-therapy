import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, List, ListItem, ListItemText } from '@mui/material';

const MainContent = () => {
    const [input, setInput] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [error, setError] = useState('');
    const [dataList, setDataList] = useState([]);
    const [divMessage, setDivMessage] = useState('I am perfectly centered.');

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5001/data');
            setDataList(response.data);
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    const sendData = async () => {
        try {
            const response = await axios.post('http://localhost:5001/data', { input });
            setResponseMessage(response.data.message);
            setError('');
            fetchData(); // Refresh the data list after successful submission
        } catch (err) {
            console.error('Error sending data:', err);
            setResponseMessage('');
            setError('Could not send data to the backend.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() === '') {
            setError('Input cannot be empty.');
            return;
        }
        if (input.length > 50) {
            setError('Input must be 50 characters or less.');
            return;
        }
        sendData();
        setInput('');
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setDivMessage('STOP moving me! I was perfectly centered!');
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Container maxWidth="sm" style={{ padding: '2rem', textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Centered Div Therapy
            </Typography>
            <Typography variant="body1" gutterBottom style={{ marginBottom: '1rem', fontStyle: 'italic' }}>
                {divMessage}
            </Typography>
            <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Send data to backend"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    error={!!error}
                    helperText={error}
                    style={{ marginBottom: '1rem' }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ width: '100%' }}
                >
                    Submit
                </Button>
            </form>
            {responseMessage && (
                <Typography variant="body1" color="success" gutterBottom>
                    {responseMessage}
                </Typography>
            )}
            <Typography variant="h5" gutterBottom>
                {dataList.length > 0
                    ? `Submitted Data (${dataList.length} items)`
                    : 'No Data Submitted Yet'}
            </Typography>

            <List>
                {dataList.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={item.input}
                            secondary={`Submitted on: ${item.timestamp}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default MainContent;
