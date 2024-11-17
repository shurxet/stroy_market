// src/components/forms/ProductForm/ProductFormSchema.ts
import * as yup from 'yup';

export const productSchema = yup.object({
    name: yup.string().required('Name is required'),
    description: yup.string().required('Description is required'),
    price: yup.number().required('Price is required').positive('Price must be positive'),
    category_id: yup.number().required('Category is required').integer('Category ID must be an integer'),
    stores: yup.array().of(
        yup.object({
            id: yup.number().required(),
            name: yup.string().required(),
        })
    ), // .optional() Сделайте optional, если это поле не всегда требуется
});
