import { BrowserRouter } from 'react-router-dom';
import { useState } from "react";

import HeaderNotConnected from './NotConnected/HeaderNotConnected.js'
import ContentNotConnected from './NotConnected/ContentNotConnected.js'
import HeaderConnected from './Connected/HeaderConnected.js'
import ContentConnected from './Connected/ContentConnected.js'
import './App.css'
import './GlobalContent.css'
import './Header.css'

// import Test from './Test.js';

function App () {
    const [isNotConnected, setIsNotConnected] = useState("true");
    
    const toggleConnected = () => {
        setIsNotConnected(!isNotConnected);
    };

    return (
        <BrowserRouter>
            <div className="App">
                {/* <button onClick={toggleConnected}>salut</button> */}
                {/* <div onClick={toggleConnected}>{isConnected}</div> */}
                {isNotConnected ? 
                    <div><HeaderNotConnected /> <ContentNotConnected /></div>
                    : 
                    <div><HeaderConnected /> <ContentConnected /></div> 
                }

            </div>
        </BrowserRouter>
        
    );
}

export default App;
