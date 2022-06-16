import { Routes, Route } from 'react-router-dom';

import Accueil from './Components/Accueil.js';
import PageInscription from './Components/PageInscription.js';
import PageDeConnexion from './Components/PageDeConnexion.js';
import PasswordForget from './Components/PasswordForget.js';

import './ContentNotConnected.css'

function ContentNotConnected () {
    return(
        <main className="page-content">
            <Routes>
                <Route exact path="/" element={<Accueil />} />

                <Route path="/inscription" element={<PageInscription />} />

                <Route path="/connexion" element={<PageDeConnexion />} />

                <Route path="/password-forget" element={<PasswordForget />} />
            </Routes>
            
        </main>
    );
}

export default ContentNotConnected;