// src/api/storeApi.ts
import axios, {AxiosResponse} from "axios";
import {CreateStore, Store} from "../types";

const BASE_URL = 'http://localhost:8000/stores/';

export const apiFetchStore = async (): Promise<Store[]> => {
    try {
        const response: AxiosResponse<Store[]> = await axios.get(BASE_URL);
        return response.data; // Возвращаем данные, а не весь ответ
    } catch (error) {
        console.error('Failed to fetch stores', error);
        throw error; // Можно выбросить ошибку для обработки на уровне вызова
    }
};

export const apiCreateStore = async (store: CreateStore): Promise<Store> => {
    // console.log('createShop Date', store);
    try {
        const response: AxiosResponse<Store> = await axios.post(BASE_URL, store);
        return response.data;
    } catch (error) {
        console.error('Failed to add shop', error);
        throw error;
    }
};

export const apiUpdateStore = async (store: Store): Promise<Store> => {
    try {
        const response: AxiosResponse<Store> = await axios.put(`${BASE_URL}${store.id}`, store);
        return response.data;
    } catch (error) {
        console.error('Failed to update shop', error);
        throw error;
    }
};
