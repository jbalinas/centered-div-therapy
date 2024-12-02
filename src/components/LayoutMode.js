import React, { useState, useRef } from 'react';
import { Box, Button, keyframes } from '@mui/material';
import CenteredDiv from './CenteredDiv';

const LayoutMode = () => {
    const [currentLayout, setCurrentLayout] = useState('default');
    const containerRef = useRef(null);

    // Define different layout styles
    const layouts = {
        default: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '400px',
            backgroundColor: '#ffffff',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridGap: '10px',
            height: '400px',
            backgroundColor: '#ffffff', 
        },
        chaotic: {
            position: 'relative',
            height: '400px',
            width: '100%',
            overflow: 'hidden', 
            backgroundImage: 'url("https://media.tenor.com/Ivb2PnLZzsUAAAAC/fire-elmo.gif")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        },
    };

    const generateBouncingKeyframes = (startX, startY, maxX, maxY) => {
        return keyframes`
            0% { transform: translate(${startX}px, ${startY}px); }
            25% { transform: translate(${maxX}px, ${startY}px); }
            50% { transform: translate(${maxX}px, ${maxY}px); }
            75% { transform: translate(${startX}px, ${maxY}px); }
            100% { transform: translate(${startX}px, ${startY}px); }
        `;
    };

    const generateChaos = () => {
        const container = containerRef.current;
        if (!container) return null;

        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        const chaosDivs = Array.from({ length: 5 }, (_, i) => {
            // Starting positions adjusted to include the full range
            const startX = Math.random() * (containerWidth - 50); // Full width, no offset restriction
            const startY = Math.random() * (containerHeight - 50); // Full height, no offset restriction

            // Maximum movement range (ensures they don’t exceed the boundaries)
            const maxX = containerWidth - 50; // Adjust for element size (50px)
            const maxY = containerHeight - 50; // Adjust for element size (50px)

            const keyframes = generateBouncingKeyframes(startX, startY, maxX, maxY);
            const randomDuration = `${Math.random() * 3 + 2}s`; // Random duration between 2s and 5s

            return (
                <Box
                    key={i}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '50px',
                        height: '50px',
                        backgroundColor: 'rgba(255,0,0,0.5)',
                        animation: `${keyframes} ${randomDuration} linear infinite`,
                    }}
                />
            );
        });

        return chaosDivs;
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <Button variant="outlined" onClick={() => setCurrentLayout('default')}>
                    Default Layout
                </Button>
                <Button variant="outlined" onClick={() => setCurrentLayout('grid')}>
                    Grid Layout
                </Button>
                <Button variant="outlined" onClick={() => setCurrentLayout('chaotic')}>
                    Chaotic Layout
                </Button>
            </Box>
            <Box
                ref={containerRef}
                sx={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    ...layouts[currentLayout],
                }}
            >
                {currentLayout === 'chaotic' && generateChaos()}
                <CenteredDiv layoutMode={currentLayout} /> {/* Pass currentLayout as layoutMode */}
            </Box>
        </Box>
    );
};

export default LayoutMode;
