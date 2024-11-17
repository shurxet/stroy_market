// src/hooks/useStores.ts
import { useState, useEffect } from 'react';
import {apiCreateStore, apiFetchStore, apiUpdateStore} from '../api/storeApi.ts';
import {CreateStore, Store} from "../types";


export const useStores = () => {
    const [allStores, setStores] = useState<Store[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadStores = async () => {
            try {
                const stores = await apiFetchStore();
                setStores(stores);
            } catch (error) {
                setError('Ошибка при загрузке магазинов');
            } finally {
                setLoading(false);
            }
        };
        loadStores();
    }, []);

    const updateStore = async (store: Store) => {
        try {
            if (store.id) {
                await apiUpdateStore(store);
                setStores((prev) => prev.map((p) => (p.id === store.id ? store : p)));
            }
        } catch (error) {
            setError('Ошибка при сохранении продукта');
        }
    };

    const createStore = async (store: CreateStore) => {
        try {
            const response = await apiCreateStore(store);
            setStores((prev) => [...prev, response]);
            return response
        } catch (error) {
            setError('Ошибка при создании продукта')
        }
    };

    return { allStores, updateStore, createStore, loading, error, setStores};
};
