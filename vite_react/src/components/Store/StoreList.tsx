// src/components/Store/StoreList.tsx
import React, { useCallback, useState } from 'react';
import { StoreListProps } from '../../types';
import StoreForm from '../forms/StoreForm/StoreForm.tsx';
import { useStores } from '../../hooks/useStores.ts';
import { List, Typography, Box, IconButton } from "@mui/material";
import { Edit as EditIcon } from '@mui/icons-material';
import StoreItem from "./StoreItem.tsx";
import { addSelectedStoresToProduct, updateStoreName } from "../../utils/storeHandlers.ts";
import { useModal } from "../../hooks/useModal.ts";


const StoreList: React.FC<StoreListProps> = ({ product, isEditing, onChange }) => {
    const { allStores } = useStores();
    const { isModalOpen, openModal, closeModal } = useModal();
    const [selectedStoresId, setSelectedStoresId] = useState<number[]>([]);

    // Обработчик изменения названия магазина
    const handleInputStore = useCallback((storeId: number, name: string) => {
        const updatedStores = updateStoreName(product, storeId, name);
        console.log('updatedStores', updatedStores);
        onChange('stores', updatedStores);
    }, [product, onChange]);

    // Обработчик добавления выбранных магазинов в продукт
    const handleAddStoresToProduct = useCallback(() => {
        const updatedStores = addSelectedStoresToProduct(product, allStores, selectedStoresId);
        onChange('stores', updatedStores);
        closeModal();
        setSelectedStoresId([]);
    }, [product, allStores, selectedStoresId, onChange, closeModal]);

    // Рендер списка магазинов
    const renderStoreList = () => (
        <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1, mt: 2 }}>
            {product.stores.map(store => (
                <StoreItem
                    key={store.id}
                    store={store}
                    isEditing={isEditing}
                    onChange={handleInputStore}
                />
            ))}
        </List>
    );

    // Рендер кнопки редактирования
    const renderEditButton = () => isEditing && (
        <IconButton color="primary" onClick={openModal} sx={{ mb: 1 }}>
            <EditIcon />
            <Typography sx={{ ml: 1 }}>Редактировать список</Typography>
        </IconButton>
    );

    return (
        <Box sx={{ mt: 2 }}>
            {isModalOpen && isEditing && (
                <StoreForm
                    setSelectedStores={setSelectedStoresId}
                    selectedStores={selectedStoresId}
                    onAddShops={handleAddStoresToProduct}
                    onClose={closeModal}
                />
            )}
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                Список магазинов
            </Typography>
            {renderEditButton()}
            {renderStoreList()}
        </Box>
    );
};

export default StoreList;
