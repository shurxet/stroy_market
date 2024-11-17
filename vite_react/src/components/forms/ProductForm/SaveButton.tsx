// src/components/forms/ProductForm/SaveButton.tsx
import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { Save, Update } from '@mui/icons-material';

interface SaveButtonProps {
    isSubmitting: boolean;
    isUpdateMode: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({ isSubmitting, isUpdateMode }) => (
    <Button
        type="submit"
        variant="contained"
        color="primary"
        startIcon={isUpdateMode ? <Update /> : <Save />}
        disabled={isSubmitting}
    >
        {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
        ) : isUpdateMode ? 'Update Product' : 'Добавить новый продукт'}
    </Button>
);

export default SaveButton;
