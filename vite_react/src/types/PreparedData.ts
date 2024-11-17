// src/types/PreparedData.ts
export interface ProductPayload {
    id?: number;
    name: string;
    description: string;
    price: number;
    category_id: number;
    quantity?: number;
    status?: string;
    stores: number[];
}