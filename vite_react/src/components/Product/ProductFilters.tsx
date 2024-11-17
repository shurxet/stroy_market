// src/components/Product/ProductFilters.tsx
import React from 'react';
import {
    Box,
    Divider,
    Slider,
    Typography,
    FormControlLabel,
    Checkbox,
    CircularProgress,
    CardHeader,
    CardContent, Grid, Card
} from '@mui/material';
import CategoryFilter from '../CategoryFilter/CategoryFilter';

const cardHeaderFilteresStyles = {
    backgroundColor: '#6c63ff',
    color: '#fff',
    textAlign: 'center',
    borderRadius: '12px 12px 0 0',
    padding: '20px',
    '.MuiCardHeader-title': {
        fontSize: '1.1rem', // Устанавливает размер шрифта
        fontWeight: 'bold', // Делает шрифт жирным (опционально)
        lineHeight: '1.2',  // Устанавливает высоту строки
    },
};

interface ProductFiltersProps {
    categories: Array<any>;
    setFilteredCategory: (category: number | null) => void;
    priceRange: number[];
    setPriceRange: (range: number[]) => void;
    onlyAvailable: boolean;
    setOnlyAvailable: (value: boolean) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
    categories,
    setFilteredCategory,
    priceRange,
    setPriceRange,
    onlyAvailable,
    setOnlyAvailable,
}) => (
    <Grid item xs={12} md={3}>
        <Card elevation={6} sx={{ borderRadius: 3, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)' }}>
            <CardHeader title="Фильтры" sx={cardHeaderFilteresStyles} />
            <CardContent>
                <Box
                    sx={{
                        maxHeight: '500px', // Установите желаемую максимальную высоту
                        overflowY: 'auto', // Добавляет вертикальную прокрутку
                        padding: '16px',
                        border: '1px solid #ddd', // Опционально, для визуального выделения
                        borderRadius: '8px',
                    }}
                >
                    {categories.length ? (
                        <>
                            <CategoryFilter categories={categories} onSelect={setFilteredCategory} />
                            <Divider sx={{ marginY: 2 }} />
                            <Typography variant="subtitle1" gutterBottom>
                                Диапазон цен:
                            </Typography>
                            <Slider
                                value={priceRange}
                                onChange={(_, newValue) => setPriceRange(newValue as number[])}
                                valueLabelDisplay="auto"
                                min={0}
                                max={10000}
                                step={10}
                                sx={{ marginBottom: 2 }}
                            />
                            <Divider sx={{ marginY: 2 }} />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={onlyAvailable}
                                        onChange={(_event, checked) => setOnlyAvailable(checked)} // Используем второй аргумент "checked"
                                    />
                                }
                                label="Только в наличии"
                            />
                        </>
                    ) : (
                        <CircularProgress sx={{ display: 'block', margin: 'auto' }} />
                    )}
                </Box>
            </CardContent>
        </Card>
    </Grid>
);

export default ProductFilters;
