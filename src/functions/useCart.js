import { useState, useEffect } from 'react';
// import useAlert from './useAlert';

const useCart = (showAlert) => {

    const [cart, setCart] = useState([]);
    // const { console.log } = useAlert();

    useEffect(() => {
        const saved = localStorage.getItem("cart");
        if (saved) setCart(JSON.parse(saved));
    }, [])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    })



    const addToCart = (product) => {

        setCart(prevCart => {
            const existing = prevCart.find(item => item.slug === product.slug);
            const existingQuantity = existing ? existing.quantity : 0;
            const total = existingQuantity + product.quantity;

            if (total > product.stock) {
                showAlert(
                    `Hai superato la quantità disponibile per "${product.name}". Disponibili: ${product.stock}`,
                    'error'
                );
                return prevCart;
            } else {
                showAlert(`${product.name} aggiunto al carrello!`, 'success');
            }

            if (existing) {
                return prevCart.map(item =>
                    item.slug === product.slug
                        ? { ...item, quantity: item.quantity + product.quantity }
                        : item
                );
            }

            return [
                ...prevCart,
                {
                    ...product,
                    maxStock: product.stock
                },
            ];
        });
    };



    //funzione di rimozione dal carrello
    const removeFromCart = (productSlug) => {
        setCart(prevCart => prevCart.filter(item => item.slug !== productSlug));
    };


    //funzione di cancellazione carrello
    const clearCart = () => {
        setCart([]);
    };


    return {
        cart,
        setCart,
        addToCart,
        removeFromCart,
        clearCart,
    }

}

export default useCart;