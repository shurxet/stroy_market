// src/api/productApi.ts
import axios, { AxiosResponse } from 'axios';
import {Product} from "../types";
import {ProductPayload} from "../types/PreparedData.ts";


const BASE_URL = 'http://localhost:8000/products/';

export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response: AxiosResponse<Product[]> = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch products', error);
        throw error; // Можно выбросить ошибку для обработки на уровне вызова
    }
};

export const updateProductApi = async (product: Product): Promise<Product> => {
    try {
        const response: AxiosResponse<Product> = await axios.put(`${BASE_URL}${product.id}`, product);
        return response.data;
    } catch (error) {
        console.error('Failed to update product', error);
        throw error;
    }
};

export const deleteProduct = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}${id}`);
    } catch (error) {
        console.error('Failed to delete product', error);
        throw error;
    }
};

export const createProductApi = async (product: Product): Promise<Product> => {

    const prepareProductData = (data: Product): ProductPayload => ({
        ...data,
        stores: data.stores.map(store => store.id)  // Преобразуем в массив идентификаторов
    });

    const dataProduct = prepareProductData(product)
    console.log('createProduct prepareProductData', dataProduct);
    try {
        const response: AxiosResponse<Product> = await axios.post(BASE_URL, dataProduct);
        return response.data;
    } catch (error) {
        console.error('Failed to add product', error);
        throw error;
    }
};
