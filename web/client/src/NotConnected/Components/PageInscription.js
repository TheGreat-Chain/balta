import { NavLink } from 'react-router-dom';

import logo from '../../image/logo_balta_white 1.svg'

function PageInscription() {
    return (
        <div className="inscription-page">
            <div className="main-content">
                <img src={logo} className="logo" alt="logo" />
                <div className="slogan">Créer, cochez, c'est corrigé !</div>

                <div className="content-title">INSCRIPTION</div>
                
                <div className="input-container">
                    <div className="input-title">Identifiant</div>
                    <input type="text" placeholder="Votre identifiant"/>

                    <div className="input-title">Adresse e-mail</div>
                    <input type="text" placeholder="adresse@xyz.com"/>

                    <div className="input-title">Mot de passe</div>
                    <input type="password" placeholder="mot de passe"/>
                    
                    <div className="input-title">Confirmation de Mot de passe</div>
                    <input type="password" placeholder="mot de passe"/>
                    
                </div>

                <NavLink to="/" className="primary-button">
                    <div className="primary-text">INSCRIPTION</div>
                </NavLink>
            
                <div className="button-subtitle">Vous avez déjà un compte ? <NavLink to="/connexion">Se connecter</NavLink></div>
            </div>
        </div>
    );
}

export default PageInscription;