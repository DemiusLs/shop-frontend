import { createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Alert from '../components/Alert';
import fetchProducts from '../functions/fetch';
import useCart from '../functions/useCart';
import useWishList from '../functions/useWishList';
import useAlert from "../functions/useAlert"
import useCompare from '../functions/useCompare';



const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [searchParams] = useSearchParams();
    const initialViewMode = searchParams.get('view') || 'grid';
    const initialSortBy = searchParams.get('sort') || 'newest';
    const [products, setProducts] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showWelcomePopup, setShowWelcomePopup] = useState(true);
    const [sortBy, setSortBy] = useState(initialSortBy);
    const [viewMode, setViewMode] = useState(initialViewMode);


    //useeffect per settare il local storage
    useEffect(() => {

        fetchProducts(setProducts, setIsLoading, setError);
        const visited = localStorage.getItem('boolshop_visited');
        if (visited) {
            setShowWelcomePopup(false);
        }

    }, []);

    const alert = useAlert();
    const cart = useCart(alert.showAlert);
    const wishlist = useWishList(alert.showAlert);
    const compare = useCompare(alert.showAlert);




    const showPopup = (message, type = 'success') => {
        setPopup({ message, type });
    };

    const value = {
        products,
        setProducts,
        isLoading,
        error,
        showWelcomePopup,
        sortBy,
        viewMode,
        setSortBy,
        setViewMode,
        hideWelcomePopup: () => setShowWelcomePopup(false),
        showPopup,
        ...cart,
        ...wishlist,
        ...alert,
        ...compare,
    };

    return (
        <AppContext.Provider value={value}>
            {children}

            {/* ALERT GLOBALE */}
            <Alert
                message={alert.message}
                visible={alert.visible}
                type={alert.type}
                onClose={() => setAlertVisible(false)}
            />
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext deve essere usato dentro un AppProvider');
    }
    return context;
};