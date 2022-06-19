import { Routes, Route } from 'react-router-dom';

import Accueil from './Components/Accueil.js';
import MesCorrections from './Components/Correction/MesCorrections.js';
import MesQCM from './Components/QCM/MesQCM.js';
import ListeDesNotes from './Components/Correction/ListeDesNotes.js';

import './ContentConnected.css'

function ContentConnected () {
    return(
        <main className="page-content">
            <Routes>
                <Route exact path="/accueil" element={<Accueil />} />
                <Route path="/mes-corrections" element={<MesCorrections />} />
                <Route path="/liste-des-notes" element={<ListeDesNotes />} />
                <Route path="/mes-QCM" element={<MesQCM />} />
            </Routes>
            
        </main>
    );
}

export default ContentConnected;
