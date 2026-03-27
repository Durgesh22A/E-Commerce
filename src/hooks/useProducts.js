import { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';
// Humne yahan se fetchCategories hata diya hai kyunki ab hum categories dynamically banayenge

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                // Sirf products fetch karein
                const productsData = await fetchProducts();

                setProducts(productsData);

                // NAYA LOGIC: Jo products aaye hain, sirf unhi ki categories nikalo
                // Set() duplicate values ko automatically hata deta hai
                const uniqueCategories = [...new Set(productsData.map(item => item.category))];

                setCategories(uniqueCategories);

            } catch (err) {
                setError(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    return { products, categories, loading, error };
};