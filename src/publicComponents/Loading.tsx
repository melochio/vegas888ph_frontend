import { Height } from '@mui/icons-material';
import { Box, CircularProgress, Container, Grid } from '@mui/material';
import React, { ReactNode } from 'react';

type ModalProps = {
    isOpen: boolean; 
};

const Loader: React.FC<ModalProps> = ({ isOpen}) => {
    return (
        <>
            {isOpen && (
                 <Box
                 sx={{
                   display: 'flex',
                   alignItems: 'center',     // Center vertically
                   justifyContent: 'center', // Center horizontally
                   position: 'fixed',
                   zIndex: 1000,
                   top: 0,
                   left: 0,
                   width: '100vw',           // Take full viewport width
                   height: '100vh',          // Take full viewport height
                   backgroundColor: 'rgba(255, 255, 255, 0.5)', // Optional overlay background
                 }}
               >
                 <CircularProgress />
               </Box>
            )}
        </>
    );
};

export default Loader;
