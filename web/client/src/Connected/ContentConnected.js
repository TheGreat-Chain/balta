import { Routes, Route } from 'react-router-dom';

import Accueil from './Components/Accueil.js';
import MesCorrections from './Components/Correction/MesCorrections.js';
import ListeDesNotes from './Components/Correction/ListeDesNotes.js';
import ListeQCM from './Components/QCM/ListeQCM.js';

import EditionQCM from './Components/QCM/EditionQCM.js';

import './ContentConnected.css'

function ContentNotConnected () {
    return(
        <main className="page-content">
            <Routes>
                <Route exact path="/" element={<Accueil />} />

                <Route path="/mes-corrections" element={<MesCorrections />} />
                
                <Route path="/liste-des-notes" element={<ListeDesNotes />} />

                <Route path="/mes-QCM" element={<ListeQCM />} />

                <Route path="/creation-qcm/:id" element={<EditionQCM />} />

            </Routes>
            
        </main>
    );
}

export default ContentNotConnected;