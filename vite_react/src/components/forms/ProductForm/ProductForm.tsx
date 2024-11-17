// src/components/forms/ProductForm/ProductForm.tsx
import React, {useEffect} from 'react';
import {useForm, Controller, Resolver} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {Category, Product, Store} from "../../../types";
import { TextField, Box } from '@mui/material';
import { productSchema } from './ProductFormSchema.ts';
import SaveButton from './SaveButton.tsx';
import SelectCategory from "./SelectCategory.tsx";
import {formStyles, saveButtonBoxStyles} from "./ProductForm.styles.ts";
import SelectShops from "./SelectShops.tsx";

interface ProductFormProps {
    onSubmit: (product: Product) => void;
    existingProduct?: Product | null;
    categories: Category[];
    allStores: Store[];  // Передаем массив существующих магазинов
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, existingProduct, categories, allStores }) => {
    console.log('existingProduct', existingProduct)
    console.log('allStores', allStores)
    const { control, handleSubmit, setValue, reset, formState: { errors, isSubmitting } } = useForm<Product>({
        resolver: yupResolver(productSchema) as unknown as Resolver<Product>, // Приведение типа к Resolver<Product>
        defaultValues: {
            name: existingProduct?.name || '',
            description: existingProduct?.description || '',
            price: existingProduct?.price || 0,
            category_id: existingProduct?.category_id || undefined,
            quantity: existingProduct?.quantity || 0,
            status: existingProduct?.status || 'active',
            stores: existingProduct?.stores || [],
        },

    });

    useEffect(() => {
        if (existingProduct) {
            setValue('id', existingProduct.id);
            setValue('name', existingProduct.name);
            setValue('description', existingProduct.description);
            setValue('price', existingProduct.price);
            setValue('category_id', existingProduct.category_id);
        }
    }, [existingProduct, setValue]);

    const onSubmitForm = async (data: Product) => {
        try {
            onSubmit(data)
            reset();
        } catch (error) {
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmitForm)}
            sx={formStyles}
        >
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Product Name"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        fullWidth
                        variant="outlined"
                    />
                )}
            />
            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Description"
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        fullWidth
                        variant="outlined"
                    />
                )}
            />
            <Controller
                name="price"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Price"
                        type="number"
                        error={!!errors.price}
                        helperText={errors.price?.message}
                        fullWidth
                        variant="outlined"
                    />
                )}
            />
            <SelectCategory control={control} categories={categories} error={errors.category_id?.message} />
            {/*<SelectShops control={control} allStores={allStores} error={errors.shops?.message} />*/}
            <SelectShops control={control} />

            <Box sx={saveButtonBoxStyles}>
                <SaveButton isSubmitting={isSubmitting} isUpdateMode={!!existingProduct} />
            </Box>
        </Box>
    );
};

export default ProductForm;
