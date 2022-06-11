import { BrowserRouter } from 'react-router-dom';
import { useState } from "react";


function Variable () {
    const [isNotConnected, setIsNotConnected] = useState("false");
    

    return (isNotConnected);
}

function Fonction () {
    const [isNotConnected, setIsNotConnected] = useState("false");
    const toggleConnected = () => {
        alert("eyo");
        setIsNotConnected(!isNotConnected);
    };

    return ([toggleConnected, isNotConnected])
}

export default Fonction;