import React from 'react';
import { Container} from '@mui/material';
import LayoutMode from './LayoutMode';

const MainContent = () => {
    return (
        <Container maxWidth="sm" style={{ padding: '.5rem', textAlign: 'center' }}>
            <LayoutMode />
        </Container>
    );
};

export default MainContent;
