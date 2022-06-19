import { Routes, Route } from 'react-router-dom';

import Accueil from './Components/Accueil.js';
import PageInscription from './Components/PageInscription.js';
import PageDeConnexion from './Components/PageDeConnexion.js';
import PasswordForget from './Components/PasswordForget.js';
import ValidateCode from './Components/ValidateCode.js';
import ChangerPassword from './Components/ChangerPassword.js';

import AccueilConnected from '../Connected/Components/Accueil.js';
import MesCorrections from '../Connected/Components/Correction/MesCorrections';
import MesQCM from '../Connected/Components/QCM/MesQCM.js';
import ListeDesNotes from '../Connected/Components/Correction/ListeDesNotes.js';

import './ContentNotConnected.css'


function ContentNotConnected () {
    return(
        <main className="page-content">
            <Routes>
                <Route exact path="/" element={<Accueil />} />
                <Route path="/inscription" element={<PageInscription />} />
                <Route path="/connexion" element={<PageDeConnexion />} />
                <Route path="/password-forget" element={<PasswordForget />} />
                <Route path="/code-de-validation" element={<ValidateCode />} />
                <Route path="/change-password" element={<ChangerPassword />} />

                <Route exact path="/accueil" element={<AccueilConnected />} />
                <Route path="/mes-corrections" element={<MesCorrections />} />
                <Route path="/liste-des-notes" element={<ListeDesNotes />} />
                <Route path="/mes-QCM" element={<MesQCM />} />
            </Routes>
            
        </main>
    );
}

export default ContentNotConnected;