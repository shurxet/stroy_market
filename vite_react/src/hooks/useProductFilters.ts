// src/hooks/useProductFilters.ts
import { useState, useMemo } from 'react';
import { Product } from '../types';

export const useProductFilters = (products: Product[]) => {
    const [filteredCategory, setFilteredCategory] = useState<number | null>(null);
    const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);
    const [onlyAvailable, setOnlyAvailable] = useState(true);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const inCategory = filteredCategory ? product.category_id === filteredCategory : true;
            const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
            const isAvailable = !onlyAvailable || product.quantity > 0;
            return inCategory && inPriceRange && isAvailable;
        });
    }, [products, filteredCategory, priceRange, onlyAvailable]);

    return {
        filteredProducts,
        filterProps: { filteredCategory, setFilteredCategory, priceRange, setPriceRange, onlyAvailable, setOnlyAvailable },
    };
};
