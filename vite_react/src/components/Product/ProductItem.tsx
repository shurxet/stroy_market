// src/components/Product/ProductItem.tsx
import React from 'react';
import { Product } from '../../types';
import EditableField from '../common/EditableField.tsx';
import { Card, CardContent, Typography, Button, Stack, Divider, IconButton, Grid, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import StoreList from "../Store/StoreList.tsx";


interface ProductItemProps {
    product: Product;
    isShowStores: boolean;
    isEditing: boolean;
    onShowStores: () => void;
    onEdit: () => void;
    onDelete: (product: Product) => void;
    onUpdate: (productId: number, updateData: { keyItem: keyof Product; valueItem: any }) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
    product,
    isShowStores,
    isEditing,
    onShowStores,
    onEdit,
    onDelete,
    onUpdate
}) => {

    const handleInputProduct = (
        key: keyof Product,
        value: string | number | { id: number | undefined; name: string }[]
    ) => {
        const updateData = {
            keyItem: key,
            valueItem: value,
        };
        onUpdate(product.id, updateData)
    };


    return (
        <Card
            variant="outlined"
            sx={{
                my: 2,
                p: 2,
                borderRadius: 3,
                boxShadow: 3,
                transition: 'transform 0.3s ease',
                backgroundColor: '#f9f9f9',
                '&:hover': { transform: 'scale(1.02)', boxShadow: 6 },
            }}
        >
            <CardContent>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={8}>
                        {isEditing ? (
                            <Stack spacing={1}>
                                <EditableField
                                    value={product.name || ''}
                                    fieldKey="name" // Передаём название ключа как fieldKey
                                    fieldName="Название:"
                                    onChange={handleInputProduct}
                                />
                                <EditableField
                                    value={product.price || ''}
                                    fieldKey="price"
                                    fieldName="Цена:"
                                    onChange={handleInputProduct}
                                />
                            </Stack>
                        ) : (
                            <Box>
                                <Typography variant="h6" component="span" sx={{ fontWeight: 500, color: '#333' }}>
                                    {product.name}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Цена: {product.price.toFixed(2)} ₽
                                </Typography>
                                <Button
                                    variant="text"
                                    color="info"
                                    onClick={onShowStores}
                                    sx={{
                                        textTransform: 'none',
                                        fontWeight: 500,
                                        color: '#1976d2',
                                    }}
                                >
                                    {`В наличии в ${product.stores.length} магазинах`}
                                </Button>
                            </Box>
                        )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                            {isEditing ? (
                                <>
                                    <IconButton color="secondary" onClick={onEdit}>
                                        <CancelIcon />
                                    </IconButton>
                                </>
                            ) : (
                                <>
                                    <IconButton color="primary" onClick={onEdit}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => onDelete(product)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            )}
                        </Stack>
                    </Grid>
                </Grid>
                {isShowStores && (
                    <>
                        <Divider sx={{ my: 1 }} />
                        <StoreList
                            product={product}
                            isEditing={isEditing}
                            onChange={handleInputProduct}
                        />
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default ProductItem;
