import { useState } from "react";
import { NavLink } from 'react-router-dom';
import logoBlack from '../image/logo_balta_black 1.svg'
import logoWhite from '../image/logo_balta_white 1.svg'

function HeaderNotConnected () {
    const [isActive, setActive] = useState("false");
    const [lightMode, setLightMode] = useState("false");

    const toggleMenu = () => {
        setActive(!isActive);
    };
    
    const toggleLightMode = () => {
        setLightMode(!lightMode);
        document.getElementsByClassName("App")[0].classList.toggle('light-mode');
    }

    return (
        <nav className={isActive ? "navbar" : "navbar show-nav"}>
        <div className="navbar__logo">
                <img src={lightMode ? logoWhite : logoBlack} alt="" />
                <div>BALTA</div>
            </div>

        <div className="container-links">
            <ul className="navbar__links">
                <li className="navbar__link first"><NavLink to="/" activeClassName="active" onClick={toggleMenu}>Accueil</NavLink></li>
                <li className="navbar__link second"><NavLink to="/connexion" activeClassName="active" onClick={toggleMenu}>Connexion</NavLink></li>
                <li className="navbar__link third"><NavLink to="/inscription" activeClassName="active" onClick={toggleMenu}>Inscription</NavLink></li>
                {/* <li className="navbar__link fourth"><NavLink to="/" activeClassName="active" onClick={toggleMenu}>Corriger QCM</NavLink></li> */}
                {/* <li className="navbar__link fifth"><NavLink to="/" activeClassName="active" onClick={toggleMenu}>Se Déconnecter</NavLink></li> */}
                {/* <li className="navbar__link fifth"><NavLink to="/" activeClassName="active" onClick={toggleMenu}><span className="icon-logout"></span></NavLink></li> */}
            </ul>
            <div className="container-icon">
                <span onClick={toggleLightMode} className="icon-theme"></span>
            </div>
        </div>

        <button className="burger" onClick={toggleMenu}>
            <span className="bar"></span>
        </button>
        </nav>
    );
}

export default HeaderNotConnected;