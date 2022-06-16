import { NavLink } from 'react-router-dom';

import logo from '../../image/logo_balta_white 1.svg'

function PageDeConnexion() {
    return (
        <div className="connexion-page">
            <div className="main-content">
                <img src={logo} className="logo" alt="logo" />
                <div className="slogan">Créer, cochez, c'est corrigé !</div>

                <div className="content-title">CONNEXION</div>
                
                <div className="input-container">
                    <div className="input-title">Adresse e-mail</div>
                    <input type="text" placeholder="adresse@xyz.com"/>

                    <div className="input-title">Mot de passe</div>
                    <input type="password" placeholder="mot de passe"/>
                    
                </div>

                <NavLink to="/password-forget"><div className="password-forget">Mot de passe oublié ?</div></NavLink>

                <NavLink to="/" className="primary-button">
                    <div className="primary-text">CONNEXION</div>
                </NavLink>
            
                <div className="button-subtitle">Pas encore de compte ? <NavLink to="/inscription">Créer un compte</NavLink></div>
            </div>
        </div>
    );
}

export default PageDeConnexion;