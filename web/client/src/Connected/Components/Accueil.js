import { NavLink } from 'react-router-dom';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import logo from '../../image/logo_balta_white 1.svg'

function Accueil() {
    const navigate = useNavigate();

    //redirection si deconnexion
    useEffect(function() {
        if(! localStorage.getItem('access-token')) {
            alert('Veuillez vous reconnecter.');
            navigate("/connexion");
        }
    }, []);
    
    return (
        <div className="accueil-con">
            <div className="main-content">
                <img src={logo} className="logo" alt="logo" />
                <div className="slogan">Créer, cochez, c'est corrigé !</div>

                <div className="content-title">BIENVENUE</div>

                <NavLink to="/" className="primary-button">
                    <div className="primary-text">CREER UN NOUVEAU QCM</div>
                </NavLink>
                <NavLink to="/mes-QCM" className="secondary-button">
                    <div className="secondary-text">CONSULTER MES QCM</div>
                </NavLink>
                <NavLink to="/mes-corrections" className="secondary-button">
                    <div className="secondary-text">CONSULTER MES CORRECTIONS</div>
                </NavLink>
                <NavLink to="/" className="secondary-button">
                    <div className="secondary-text">CORRIGER MES QCM</div>
                </NavLink>
            </div>
        </div>
    );
}

export default Accueil;