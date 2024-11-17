// src/types/Store.ts

import {Product} from "./Product.ts";

export interface Store {
    id: number;
    name: string;
}

export interface CreateStore {
    name: string;
}

export interface StoreListProps {
    product: Product;
    isEditing: boolean;
    onChange: (key: keyof Product, value: string | number | { id: number | undefined; name: string }[]) => void;
}