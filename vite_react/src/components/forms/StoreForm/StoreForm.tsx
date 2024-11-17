// src/components/forms/StoreForm/StoreForm.tsx
import React, {useState} from 'react';
import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    TextField,
} from '@mui/material';
import {useStores} from "../../../hooks/useStores.ts";


interface StoreSelectionModeProps {
    setSelectedStores: React.Dispatch<React.SetStateAction<number[]>>;
    selectedStores: number[];
    onAddShops: () => void;
    onClose: () => void;
}

const StoreForm: React.FC<StoreSelectionModeProps> = ({
    setSelectedStores,
    selectedStores,
    onAddShops,
    onClose,
}) => {
    const [storeAddress, setNewStoreAddress] = useState('');
    const {allStores, createStore} = useStores()

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewStoreAddress(event.target.value);
    };

    const handleAddNewShop = async () => {
        if (!storeAddress) return;

        const shopData = { name: storeAddress };
        const newStore = await createStore(shopData);

        if (newStore) {
            setSelectedStores((prev) => {
                return [...prev, newStore.id];
            });
            setNewStoreAddress('');
        }
    };

    const onToggleShop = (shopId: number) => {
        setSelectedStores((prev) =>
            prev.includes(shopId)
                ? prev.filter((id) => id !== shopId) // Удаление, если магазин уже выбран
                : [...prev, shopId] // Добавление, если магазин ещё не выбран
        );
    };


    return (
        <Dialog open onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>Выберите магазины для добавления</DialogTitle>
            <DialogContent dividers>
                <List>
                    {allStores.map((store) => (
                        <ListItem
                            key={store.id}
                            component="div"
                            onClick={() => onToggleShop(store.id)}
                        >
                            <Checkbox
                                edge="start"
                                checked={selectedStores.includes(store.id)}
                                tabIndex={-1}
                                disableRipple
                                color="primary"
                            />
                            <ListItemText primary={store.name} />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Box display="flex" alignItems="center" mt={2}>
                    <TextField
                        label="Добавить к списку новый адрес магазина"
                        value={storeAddress}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                    />
                    <Button onClick={handleAddNewShop} variant="contained" sx={{ml: 2}}>ADD</Button>
                </Box>
            </DialogActions>
            <Button variant="contained" color="primary" onClick={onAddShops}>
                Добавить выбранные магазины
            </Button>
        </Dialog>
    );
}

export default StoreForm;
