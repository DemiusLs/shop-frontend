import { useEffect, useState } from "react";



const useWishList = () => {

    const [wishlist, setWishlist] = useState([]);


    useEffect(() => {
        const saved = localStorage.getItem('wishlist');
        if (saved) setWishlist(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    //funzione di cambio stato del cuoricino wishlist
    const toggleWishlistIcon = (product) => {
        setWishlist(prev => {
            const exists = prev.find(item => item.slug === product.slug);
            if (exists) {
                return prev.filter(item => item.slug !== product.slug);
            } else {
                return [...prev, product];
            }
        });
    };


    //funzione di controllo se prodotto già interno alla wishlist
    const isInWishlist = (product) => {
        if (!product) return false; // protezione se product è null/undefined
        return wishlist.some(item => item.slug === product.slug);
    };


    //funzione di aggiunta alla wishlist
    const addToWishlist = (product) => {
        setWishlist(prev => {
            if (!prev.find(item => item.slug === product.slug)) {
                return [...prev, product];
            }
            return prev; // se già presente, non aggiunge
        });
    };


    //funzione di rimozione della wishlist
    const removeFromWishlist = (productSlug) => {
        setWishlist(prev => prev.filter(item => item.slug !== productSlug));
    };


    //funzione di una completa rimozione della wishlist
    const clearWishlist = () => {
        setWishlist([]);
        localStorage.removeItem('wishlist'); // opzionale: se la salvi su localStorage
    };


    return {
        toggleWishlistIcon,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
    }
}


export default useWishList