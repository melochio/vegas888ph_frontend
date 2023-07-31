import { Height } from '@mui/icons-material';
import { Container, Grid } from '@mui/material';
import React, { ReactNode } from 'react';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    return (
        <>
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    top: 10,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: '10',   
                    width:'100vw'
                }}>
                    <div style={{
                        position: 'relative',
                        backgroundColor: '#fff',
                        padding: '20px',
                        width:'70vw',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1);',
                        // width:'70%' 
                    }}>
                        {children}
                        {/* <button
                            style={{
                                backgroundColor: '#0070f3',
                                color: '#fff',
                                padding: '8px 16px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                            onClick={onClose}>
                            Close
                        </button> */}
                    </div> 
                </div >
            )}
        </>
    );
};

export default Modal;
