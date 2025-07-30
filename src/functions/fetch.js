//chiamata axios per prendere le stampe

import axios from "axios";

const fetchProducts = async (setProducts, setIsLoading, setError) => {
    setIsLoading(true);
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/prints`);
        if (res.data.data) {
            setProducts(res.data.data);
        } else {
            setError('Dati non validi');
        }
    } catch {
        setError('Errore nel caricamento');
    } finally {
        setIsLoading(false);
    }
};






export default fetchProducts;