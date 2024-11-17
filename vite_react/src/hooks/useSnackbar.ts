// src/hooks/useSnackbar.ts

// import { useState } from 'react';
//
// export const useSnackbar = () => {
//     const [openSnackbar, setOpenSnackbar] = useState(false);
//     const [errorSnackbar, setErrorSnackbar] = useState(false);
//
//     const showSuccess = () => setOpenSnackbar(true);
//     const showError = () => setErrorSnackbar(true);
//     const closeSnackbar = () => {
//         setOpenSnackbar(false);
//         setErrorSnackbar(false);
//     };
//
//     return { openSnackbar, errorSnackbar, showSuccess, showError, closeSnackbar };
// };

// import { useState } from 'react';
//
// export const useSnackbar = () => {
//     const [snackbar, setSnackbar] = useState({ isOpen: false, message: '' });
//
//     const showSnackbar = (message: string) => setSnackbar({ isOpen: true, message });
//     const closeSnackbar = () => setSnackbar({ isOpen: false, message: '' });
//
//     return { snackbar, showSnackbar, closeSnackbar };
// };

import { useState } from 'react';

type SnackbarType = 'success' | 'error' | 'info' | 'warning';

export const useSnackbar = () => {
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        type: SnackbarType;
        message: string;
    }>({
        open: false,
        type: 'info',
        message: '',
    });

    const showSnackbar = (type: SnackbarType, message: string) => {
        setSnackbar({ open: true, type, message });
    };

    const closeSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    return {
        snackbar,
        showSnackbar,
        closeSnackbar,
    };
};
