// src/components/forms/ProductForm/SnackbarNotification.tsx
import React from 'react';
import { Snackbar, Alert, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

interface SnackbarNotificationProps {
    open: boolean;
    onClose: () => void;
    severity: 'success' | 'error';
    message: string;
}

const SnackbarNotification: React.FC<SnackbarNotificationProps> = ({ open, onClose, severity, message }) => (
    <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
        <Alert
            onClose={onClose}
            severity={severity}
            sx={{ width: '100%' }}
            action={
                <IconButton size="small" color="inherit" onClick={onClose}>
                    <Close fontSize="small" />
                </IconButton>
            }
        >
            {message}
        </Alert>
    </Snackbar>
);

export default SnackbarNotification;
