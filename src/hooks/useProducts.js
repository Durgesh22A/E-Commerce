import { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const productsData = await fetchProducts();

                setProducts(productsData);

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
