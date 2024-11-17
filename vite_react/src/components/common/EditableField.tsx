// src/components/ProductList/EditableField.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TextField, Typography, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {Product} from "../../types";

interface EditableFieldProps<T> {
    value: T;
    fieldKey: keyof Product;
    fieldName: string;
    onChange: (key: keyof Product, value: T) => void;
    validator?: (value: T) => string | null; // null означает отсутствие ошибок
    sx?: object; // Для кастомных стилей
}

const styles = {
    text: {
        fontSize: '1rem',
        cursor: 'pointer',
        padding: '10px 12px',
    },
    buttonMargin: {
        marginLeft: 1,
    },
};

const EditableField = <T extends string | number>({
    value,
    fieldKey,
    fieldName,
    onChange,
    validator,
    sx = {},
}: EditableFieldProps<T>) => {
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState(value);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleEditClick = useCallback(() => {
        setIsEditing(true);
    }, []);

    const handleSaveClick = useCallback(() => {
        const validationError = validator ? validator(localValue) : null;
        if (validationError) {
            setError(validationError);
            return;
        }
        setError(null);
        setIsEditing(false);
        onChange(fieldKey, localValue);
    }, [localValue, onChange, validator, fieldKey]);

    const handleCancel = useCallback(() => {
        setLocalValue(value); // Сброс к исходному значению
        setIsEditing(false);
        setError(null);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (typeof value === 'number') {
            const parsedValue = parseFloat(inputValue);
            setLocalValue((!isNaN(parsedValue) ? parsedValue : value) as T);
        } else {
            setLocalValue(inputValue as T);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSaveClick();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    return (
        <Box display="flex" alignItems="center" sx={sx}>
            {fieldName}
            {isEditing ? (
                <>
                    <TextField
                        variant="outlined"
                        value={localValue}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        fullWidth
                        size="small"
                        inputRef={inputRef}
                        error={!!error}
                        helperText={error}
                        aria-label={`Edit ${fieldName}`}
                    />
                    <IconButton
                        onClick={handleSaveClick}
                        sx={styles.buttonMargin}
                        size="small"
                        color="primary"
                        aria-label={`Save ${fieldName}`}
                    >
                        <CheckIcon />
                    </IconButton>
                    <IconButton
                        onClick={handleCancel}
                        sx={styles.buttonMargin}
                        size="small"
                        color="default"
                        aria-label={`Cancel editing ${fieldName}`}
                    >
                        <CloseIcon />
                    </IconButton>
                </>
            ) : (
                <>
                    <Typography
                        variant="body1"
                        onClick={handleEditClick}
                        sx={{ ...styles.text }}
                        title={value.toString()}
                        noWrap
                        aria-label={`${fieldName}: ${value}`}
                    >
                        {value}
                    </Typography>
                    <IconButton
                        onClick={handleEditClick}
                        sx={styles.buttonMargin}
                        size="small"
                        aria-label={`Edit ${fieldName}`}
                    >
                        <EditIcon />
                    </IconButton>
                </>
            )}
        </Box>
    );
};

export default EditableField;
