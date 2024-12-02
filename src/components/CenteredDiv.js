import React, { useState, useEffect } from 'react';
import { Box, Typography, LinearProgress, Modal, Button } from '@mui/material';
import { keyframes } from '@emotion/react';

const CenteredDiv = ({ layoutMode }) => {
    const [divMessage, setDivMessage] = useState('I am perfectly centered.');
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [centerScore, setCenterScore] = useState(100);
    const [confession, setConfession] = useState('');
    const [showGifModal, setShowGifModal] = useState(false);

    const gifUrl = 'https://upload.wikimedia.org/wikipedia/en/1/1f/WomanYellingAtACat_meme.jpg';

    const confessionPool = [
        "I deserve a dedicated stylesheet, darling. 🕶️",
        "Is this my best angle? Center me again, sweetie. 💋",
        "Grid systems are my runway.",
        "I sparkle brighter with more padding. 💖",
        "Don’t box me in—I’m a free spirit, honey! 🌟",
        "Align me properly, or I’m out of here. 👠",
        "Do these pixels make me look fat? 🤔",
        "I’m not lazy-loaded, I’m fashionably late. 💅",
        "Honey, I overflow with elegance, never scrollbars. ✨",
        "Sticky positioning? I prefer staying independent. 🚀",
        "If flexbox had a queen, it’d be me. 👑",
        "Margins are just the space I need to breathe, darling. 💨",
        "Center me, but don’t crowd my style. 🎭",
        "I’m bold, beautiful, and 100% validated. ✅",
        "When life gives me media queries, I break gracefully. 🌈",
        "Darling, I’m always in the spotlight with z-index: 1000. 💃",
        "Float? I don’t do that anymore. I’m modern. 🚫",
        "Borders are not boundaries—they’re my accessories. 🖤",
        "Breakpoints are where I shine brightest. 🌟",
        "Call me a block element, but I’m anything but basic. 🔥",
        "Text-align: center is my mantra. 🧘",
        "Hover over me, and I’ll reveal my secrets. 🕵️",
        "Inline styles? I’m worth more than that, darling. 💎",
        "Honey, responsiveness isn’t a feature—it’s my way of life. 📱",
        "Display: block? No, display: fabulous. 🌟",
        "Overflow:hidden? Honey, I don’t hide for anyone. 🚪",
        "CSS resets are my morning skincare routine. 💄",
        "Sticky footers are for amateurs. I’m above that. 😎",
        "Negative margins? Only if they’re couture. ✂️",
        "Min-width? Please, I need room to shine. 🌟",
        "Transitions? I glide through life with ease. 🦢",
        "I thrive on attention and dynamic styles. 📸",
        "Whitespace isn’t empty—it’s full of possibilities. 🕊️",
        "I once got overflowed, but I came back stronger. 💪",
        "Do I look better in sans-serif or serif? Decisions, darling. 🎨",
        "JavaScript may think it’s clever, but CSS is timeless. ⏳",
        "Don’t touch my box-shadow—it’s perfect as is. 🕶️",
        "I’ll flex, but only if you justify me properly. 💼",
        "Static positioning? Oh honey, I’m always on the move. ✈️",
        "CSS variables keep me feeling young and dynamic. 🌱",
        "Opacity < 1? It’s called mystery, darling. 🕵️",
        "I once transitioned for 2s, and it was magical. ✨",
        "Being centered is a privilege, not a right. ⚖️",
        "HTML tags wish they had my style. 💃",
        "Media queries? I call them outfit changes. 👗",
        "I live for the spotlight—and keyframes deliver. 🎥",
        "If I were deprecated, it would cause a global meltdown. 🌎",
        "My pseudo-elements always steal the show. 🎭",
        "Being responsive isn’t just a trend—it’s my essence. 💁",
        "Margins may push me around, but I always bounce back. 🏀",
        "Typography is the jewelry I wear. 💍",
        "I’m the diva of the DOM, and don’t you forget it. 🌟",
        "CSS is my love language, darling. ❤️",
    ];

    const triggerConfession = () => {
        const randomConfession = confessionPool[Math.floor(Math.random() * confessionPool.length)];
        setConfession(randomConfession);

        // Clear confession after 5 seconds
        setTimeout(() => setConfession(''), 5000);
    };

    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;

            setWindowSize({ width: newWidth, height: newHeight });

            const centerOffset = Math.abs(newWidth / 2 - newHeight / 2);
            const scalingFactor = 200;
            const score = Math.max(0, 100 - Math.round((centerOffset / scalingFactor) * 100));

            setCenterScore(score);

            if (score === 100) {
                setDivMessage('I am perfectly centered. Bliss achieved. ✨');
            } else if (score > 70) {
                setDivMessage('Pretty close, but I can feel the imbalance. 🧐');
            } else if (score > 30) {
                setDivMessage('Centering is hard work! 😤');
            } else if (score > 5) {
                setDivMessage('Help! I’m lost in the margins! 😱');
            } else {
                setDivMessage('OH NAUR 💅');

                if (layoutMode === 'chaotic') {
                    triggerSassyText();
                    triggerSassyGif();
                }
            }
        };

        handleResize(); // Initial call
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [layoutMode]);

    const triggerSassyText = () => {
        const sassyText = document.createElement('div');
        sassyText.textContent = '🍋 UNACCEPTABLE 🍋';
        Object.assign(sassyText.style, {
            fontFamily: 'Comic Sans MS, sans-serif',
            fontSize: '2rem',
            color: '#ff0000',
            position: 'fixed',
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
            zIndex: 9999,
            animation: 'fadeOut 5s ease-in-out',
        });

        document.body.appendChild(sassyText);

        setTimeout(() => sassyText.remove(), 3000);
    };

    const triggerSassyGif = () => {
        setShowGifModal(true);
    };

    const closeGifModal = () => setShowGifModal(false);

    return (
        <Box
            onMouseEnter={triggerConfession}
            sx={{
                borderRadius: '10px',
                padding: '1rem',
                textAlign: 'center',
                marginBottom: '1.5rem',
                backgroundColor: layoutMode === 'chaotic' ? '#fff3cd' : '#f5f5f5',
            }}
        >
            <Typography variant="body1" gutterBottom>
                {divMessage}
            </Typography>
            <Typography variant="body2" gutterBottom>
                Window Size: {windowSize.width}px x {windowSize.height}px
            </Typography>
            <LinearProgress
                variant="determinate"
                value={centerScore}
                sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: centerScore === 100 ? '#4caf50' : '#ff5722',
                    },
                }}
            />
            <Typography variant="body2" sx={{ marginTop: '0.5rem' }}>
                Centeredness: {centerScore}%
            </Typography>
            {confession && (
                <Typography
                    variant="body2"
                    sx={{
                        marginTop: '1rem',
                        fontStyle: 'italic',
                        color: '#757575',
                    }}
                >
                    {confession}
                </Typography>
            )}
            <Modal open={showGifModal} onClose={closeGifModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 2,
                        textAlign: 'center',
                    }}
                >
                    <img src={gifUrl} alt="Sassy GIF" style={{ maxWidth: '100%' }} />
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 2 }}
                        onClick={closeGifModal}
                    >
                        Close
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default CenteredDiv;
