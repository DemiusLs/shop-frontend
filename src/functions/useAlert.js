import { useState } from "react";

const useAlert = () => {


    // variabili useState per componente ALERT
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('success');

    //funzione componente 
    const showAlert = (message, type = 'success') => {
        setMessage(message);
        setType(type);
        setVisible(true);

        setTimeout(() => {
            setVisible(false)

        }, 2000)
    };


    return {

        message,
        type,
        visible,
        showAlert,
        hide: () => setVisible(false),
    }
}


export default useAlert;