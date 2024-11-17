// src/hooks/useCategories.ts
import { useState, useEffect } from 'react';
import { fetchCategories } from '../api/categoryApi';
import { Category } from '../types/Category';

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await fetchCategories();
                setCategories(response.data);
            } catch (error) {
                setError('Ошибка при загрузке категорий');
            }
        };
        loadCategories();
    }, []);

    return { categories, error };
};
