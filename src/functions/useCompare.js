import { useState } from "react";


const useCompare = (showAlert) => {

    const [compareList, setCompareList] = useState([]);
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



    return {
        addToCompare,
        removeFromCompare,
    }

}


export default useCompare;