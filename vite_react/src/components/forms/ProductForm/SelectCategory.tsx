// src/components/forms/ProductForm/SelectCategory.tsx
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';
import { Category } from '../../../types';

interface SelectCategoryProps {
    control: Control<any>;
    categories: Category[];
    error?: string;
}

const SelectCategory: React.FC<SelectCategoryProps> = ({ control, categories, error }) => {
    return (
        <FormControl fullWidth variant="outlined" error={!!error}>
            <InputLabel>Category</InputLabel>
            <Controller
                name="category_id"
                control={control}
                render={({ field }) => (
                    <Select {...field} label="Category">
                        <MenuItem value="">
                            <em>Select a category</em>
                        </MenuItem>
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            />
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    );
};

export default SelectCategory;
