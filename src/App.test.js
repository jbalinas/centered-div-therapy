import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Centered Div Therapy header', () => {
    render(<App />);
    const headerElement = screen.getByRole('heading', { level: 1 });
    expect(headerElement).toBeInTheDocument();
});
