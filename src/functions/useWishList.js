import { useEffect, useState } from "react";

const useWishList = () => {

    const [wishlist, setWishlist] = useState([]);
    //quando viene montato il componente viene importata la wishlist dal local storage 
    useEffect(() => {
        const saved = localStorage.getItem('wishlist');
        if (saved) setWishlist(JSON.parse(saved));
    }, []);
    //alla modifica della wishlist viene modificato il local storage
    useEffect(() => {
        console.log(wishlist)
        //localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);




    //funzione di controllo se prodotto già interno alla wishlist
    const isInWishlist = (product) => {
        if (!product) return false; // protezione se product è null/undefined
        return wishlist.some(item => item.slug === product.slug);
    };


    //funzione di aggiunta alla wishlist
    const addToWishlist = (product) => {
        setWishlist(prev => {
            if (!prev.some(item => item.slug === product.slug)) {
                return [...prev, product];
            }
            return prev; // se già presente, non aggiunge
        });
    };


    //funzione di rimozione della wishlist
    const removeFromWishlist = (productSlug) => {
        setWishlist(prev => prev.filter(item => item.slug !== productSlug));
    };

    //funzione di cambio stato della wishlist
    const toggleWishList = (product) => {

        if (!product || !product.slug) return;

        const exists = wishlist.some(item => item.slug === product.slug);
        if (exists) {
            removeFromWishlist(product.slug)
        } else {
            addToWishlist(product)
        }
    };



    //funzione di una completa rimozione della wishlist
    const clearWishlist = () => {
        setWishlist([]);
        localStorage.removeItem('wishlist'); // opzionale: se la salvi su localStorage
    };


    return {
        wishlist,
        toggleWishList,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
    }
}


export default useWishList