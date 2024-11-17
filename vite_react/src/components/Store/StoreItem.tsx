// src/components/Store/StoreItem.tsx
import React from 'react';
import EditableField from '../common/EditableField.tsx';
import {ListItem, Typography} from "@mui/material";

interface StoreItemProps {
    store: { id: number; name: string };
    isEditing: boolean;
    onChange: (storeId: number, value: string) => void;
}

const StoreItem: React.FC<StoreItemProps> = ({ store, isEditing, onChange }) => (
    <ListItem sx={{ py: 1, px: 2, display: 'flex', alignItems: 'center' }}>
        {isEditing ? (
            <EditableField<string>
                fieldKey="name"
                fieldName=""
                value={store.name}
                onChange={(_key, value) => onChange(store.id, value)}
            />
        ) : (
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {store.name}
            </Typography>
        )}
    </ListItem>
);

export default StoreItem;
