// src/components/Product/ProductList.tsx
import React, { useState } from 'react';
import { Product } from '../../types';
import ProductItem from './ProductItem.tsx';
import { Box } from '@mui/material';

interface ProductListProps {
    products: Product[];
    onDelete: (product: Product) => void;
    onUpdate: (productId: number, updateData: { keyItem: keyof Product; valueItem: any }) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onDelete, onUpdate }) => {
    const [editProductId, setEditProductId] = useState<number | null>(null);
    const [productIdForStores, setProductIdForStores] = useState<number | null>(null);

    const handleToggleStores = (productId: number) => {
        setProductIdForStores(prevId => (prevId === productId ? null : productId));
    };

    const handleOnEdit = (productId: number) => {
        setEditProductId(prevId => (prevId === productId ? null : productId));
        setProductIdForStores(productId);
    };


    return (
        <Box
            sx={{
                maxHeight: '500px', // Установите желаемую максимальную высоту
                overflowY: 'auto', // Добавляет вертикальную прокрутку
                padding: '16px',
                border: '1px solid #ddd', // Опционально, для визуального выделения
                borderRadius: '8px',
            }}
        >
                {products.map((product) => (
                    <ProductItem
                        key={product.id}
                        product={product}
                        isShowStores={productIdForStores === product.id}
                        onShowStores={() => handleToggleStores(product.id)}
                        isEditing={editProductId === product.id}
                        onEdit={() => handleOnEdit(product.id)}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                    />
                ))}
        </Box>
    );
};

export default ProductList;
