import { NavLink } from 'react-router-dom';

import logo from '../../image/logo_balta_white 1.svg'

function PasswordForget() {
    return (
        <div className="password-forget-page">
            <div className="main-content">
                <img src={logo} className="logo" alt="logo" />
                <div className="slogan">Créer, cochez, c'est corrigé !</div>

                <div className="content-title inscription">RÉCUPÉRATION DE MOT DE PASSE</div>
                
                <div className="subtitle">Nous vous enverrons un e-mail de réinitialisation à l'adresse suivante :</div>
                <div className="input-container">
                    <div className="input-title">Adresse e-mail</div>
                    <input type="text" placeholder="adresse@xyz.com"/>
                </div>

                <NavLink to="/" className="primary-button">
                    <div className="primary-text">ENVOYER</div>
                </NavLink>
            </div>
        </div>
    );
}

export default PasswordForget;