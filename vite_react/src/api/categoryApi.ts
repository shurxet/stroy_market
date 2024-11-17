// src/api/categoryApi.ts
import axios from 'axios';
import { Category } from '../types';

export const fetchCategories = async () => axios.get<Category[]>('http://localhost:8000/categories');
