import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                padding: '1.5rem',
                backgroundColor: 'transparent', 
                color: '#333', 
                textAlign: 'center',
                borderTop: '1px solid #ddd', 
                marginTop: '2rem', 
                fontSize: '0.9rem',
            }}
        >
            <Typography variant="body2">
                © 2024 Centered Div Therapy
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', marginTop: '0.5rem' }}>
                Made with 💖 and Panick™
            </Typography>
        </Box>
    );
};

export default Footer;
