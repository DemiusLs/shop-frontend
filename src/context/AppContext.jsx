import { createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Alert from '../components/Alert';
import fetchProducts from '../functions/fetch';
import useCart from '../functions/useCart';
import useWishList from '../functions/useWishList';



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
    const [compareList, setCompareList] = useState([]);

    // variabili useState per componente ALERT
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');


    


    //useeffect per settare il local storage
    useEffect(() => {

        fetchProducts(setProducts, setIsLoading, setError);
        const visited = localStorage.getItem('boolshop_visited');
        if (visited) {
            setShowWelcomePopup(false);
        }
        

        
    }, []);


    const cart = useCart(); 
    const wishlist = useWishList();


    //useffect all'attivazione del cambio dello stato della wishlist
   

    //funzione componente ALERT
    const showAlert = (message, type = 'success') => {
        setAlertMessage(message);
        setAlertType(type);
        setAlertVisible(true);
    };


   


    //funzioni per il confronto prodotti, fatte solamente per esercizio ma non per funzionalità poichè non possiamo confrontare due prodotti d'arte
    // aggiungi prodotto a confronto
    const addToCompare = (product) => {
        setCompareList((prev) => {
            if (prev.find(p => p.slug === product.slug)) {
                showAlert(`${product.name} è già presente nella lista di confronto.`, `error`);
                return prev;
            }
            if (prev.length >= 3) {
                showAlert("Puoi confrontare al massimo 3 prodotti.", `error`);
                return prev;
            }
            showAlert(`${product.name} aggiunto alla lista di confronto.`);
            return [...prev, product];
        });
    };


    // rimuovi prodotto da confronto
    const removeFromCompare = (slug) => {
        setCompareList(prev => prev.filter(p => p.slug !== slug));
    };

    const showPopup = (message, type = 'success') => {
        setPopup({ message, type });
    };

    const value = {
        products,
        setProducts,        
        isLoading,
        error,
        showWelcomePopup,
        showAlert,
        sortBy,
        viewMode,
        setSortBy,
        setViewMode,
        hideWelcomePopup: () => setShowWelcomePopup(false),
        compareList,
        addToCompare,
        removeFromCompare,
        clearWishlist,
        showPopup,
        ...cart,
        ...wishlist,
    };

    return (
        <AppContext.Provider value={value}>
            {children}

            {/* ALERT GLOBALE */}
            <Alert
                message={alertMessage}
                visible={alertVisible}
                type={alertType}
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