// src/utils/storeHandlers.ts
import { Product } from '../types';
import { Store } from '../types';

export const updateStoreName = (product: Product, storeId: number, name: string) => {
    return product.stores.map((store) =>
        store.id === storeId ? { ...store, name } : store
    );
};

export const addSelectedStoresToProduct = (
    product: Product,
    allStores: Store[],
    selectedStoresId: number[]
) => {
    const selectedStores = allStores.filter((store) =>
        selectedStoresId.includes(store.id)
    );
    return [...product.stores, ...selectedStores];
};
