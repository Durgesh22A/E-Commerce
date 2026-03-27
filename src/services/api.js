import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

export const fetchProducts = async () => {
    const response = await axios.get(`${BASE_URL}/products?limit=0`);
    return response.data.products;
};

export const fetchProductById = async (id) => {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data;
};

export const fetchProductsByCategory = async (category) => {
    const response = await axios.get(`${BASE_URL}/products/category/${category}`);
    return response.data.products;
};