jest.mock('axios'); // Mock axios for HTTP requests

import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import MainContent from './components/MainContent';
import axios from 'axios';

afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
});

test('renders the input and submit button', async () => {
    // Mock the GET request to return an empty array
    axios.get.mockResolvedValueOnce({ data: [] });

    await act(async () => {
        render(<MainContent />);
    });

    // Use getByLabelText instead of getByPlaceholderText due to Material-UI rendering
    expect(screen.getByLabelText('Send data to backend')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
});

test('displays error for empty input', async () => {
    // Mock the GET request to return an empty array
    axios.get.mockResolvedValueOnce({ data: [] });

    await act(async () => {
        render(<MainContent />);
    });

    await act(async () => {
        fireEvent.click(screen.getByText('Submit'));
    });

    expect(screen.getByText('Input cannot be empty.')).toBeInTheDocument();
});

test('fetches and displays data from the backend', async () => {
    // Mock the GET request to return some mock data
    const mockData = [{ input: 'Test Data', timestamp: '2024-11-30 12:00 PM' }];
    axios.get.mockResolvedValueOnce({ data: mockData });

    await act(async () => {
        render(<MainContent />);
    });

    // Check if mock data appears
    expect(screen.getByText('Test Data')).toBeInTheDocument();
    expect(screen.getByText('Submitted on: 2024-11-30 12:00 PM')).toBeInTheDocument();
});

test('submits input data and updates the list', async () => {
    // Mock the GET request for initial load
    axios.get.mockResolvedValueOnce({ data: [] });

    // Mock the POST request for submission
    axios.post.mockResolvedValueOnce({
        data: { message: 'Data received: Test Input' },
    });

    // Mock the GET request after submission
    const updatedMockData = [
        { input: 'Test Input', timestamp: '2024-11-30 12:10 PM' },
    ];
    axios.get.mockResolvedValueOnce({ data: updatedMockData });

    await act(async () => {
        render(<MainContent />);
    });

    // Fill and submit the form
    await act(async () => {
        fireEvent.change(screen.getByLabelText('Send data to backend'), {
            target: { value: 'Test Input' },
        });
        fireEvent.click(screen.getByText('Submit'));
    });

    // Check if the submission message appears
    expect(await screen.findByText('Data received: Test Input')).toBeInTheDocument();

    // Check if the updated data appears in the list
    expect(await screen.findByText('Test Input')).toBeInTheDocument();
    expect(screen.getByText('Submitted on: 2024-11-30 12:10 PM')).toBeInTheDocument();
});
