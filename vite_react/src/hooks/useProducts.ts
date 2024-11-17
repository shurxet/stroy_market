// src/hooks/useProducts.ts
import { useState, useEffect } from 'react';
import { fetchProducts, updateProductApi, deleteProduct, createProductApi } from '../api/productApi';
import {Product} from "../types";


export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await fetchProducts();
                setProducts(response);
            } catch (error) {
                setError('Ошибка при загрузке продуктов');
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    const createProduct = async (product: Product) => {
        try {
            if (product) {
                const response = await createProductApi(product);
                setProducts((prev) => [...prev, response]);
            }
        } catch (error) {
            setError('Ошибка при сохранении продукта');
        }
    };



    const updateProduct = async (productId: number, dataUpdate: { keyItem: keyof Product; valueItem: any }) => {
        try {
            const ProdByID = products.find(p => p.id === productId);
            if (ProdByID) {
                const updatedProduct = (
                    {
                        ...ProdByID,
                        [dataUpdate.keyItem]: dataUpdate.valueItem,
                    }
                )
                console.log('Data for updated product', dataUpdate);
                console.log('Updated product', updatedProduct);

                await updateProductApi(updatedProduct);
                setProducts(
                    prevProducts => prevProducts.map(
                        p => p.id === productId ? updatedProduct : p
                    )
                );
            }
        } catch (error) {
            setError('Ошибка при сохранении продукта');
        }
    };


    const removeProduct = async (id: number) => {
        try {
            await deleteProduct(id);
            setProducts((prev) => prev.filter((product) => product.id !== id));
        } catch (error) {
            setError('Ошибка при удалении продукта');
        }
    };

    return { products, loading, error, setProducts, createProduct, updateProduct, removeProduct };
};
