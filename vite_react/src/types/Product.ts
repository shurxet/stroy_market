// src/types/Product.ts
import {Store} from "./Store.ts";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category_id: number;
    quantity: number;
    status: string;
    stores: Store[];
    // stores: Array<{ id: number; name: string }>;
}
