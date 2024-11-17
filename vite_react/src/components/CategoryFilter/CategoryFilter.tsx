// src/components/CategoryFilter/CategoryFilter.tsx
import React from 'react';
import { Category } from '../../types';
import { Box, Button, Typography } from '@mui/material';

interface CategoryFilterProps {
    categories: Category[];
    onSelect: (categoryId: number | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, onSelect }) => {
    const [selectedCategory, setSelectedCategory] = React.useState<number | null>(null);

    const handleSelect = (categoryId: number | null) => {
        setSelectedCategory(categoryId);
        onSelect(categoryId);
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Категории
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Button
                    variant={selectedCategory === null ? 'contained' : 'outlined'}
                    onClick={() => handleSelect(null)}
                    sx={{
                        padding: '8px 16px',
                        borderRadius: 2,
                        fontSize: '0.875rem',
                    }}
                >
                    Все категории
                </Button>
                {categories.map((category) => (
                    <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? 'contained' : 'outlined'}
                        onClick={() => handleSelect(category.id)}
                        sx={{
                            padding: '8px 16px',
                            borderRadius: 2,
                            fontSize: '0.875rem',
                        }}
                    >
                        {category.name}
                    </Button>
                ))}
            </Box>
        </Box>
    );
};

export default CategoryFilter;
