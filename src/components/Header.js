import React from 'react';

const Header = () => {
    return (
        <header style={{
            padding: '1.5rem',
            backgroundColor: 'transparent', 
            textAlign: 'center',
            color: '#222', 
            borderBottom: '1px solid #e0e0e0' 
        }}>
            <h1 style={{
                fontSize: '3rem',
                fontWeight: '500', 
                margin: '0',
                fontFamily: 'Helvetica, Arial, sans-serif'
            }}>
                Centered Div Therapy
            </h1>
        </header>
    );
};

export default Header;
