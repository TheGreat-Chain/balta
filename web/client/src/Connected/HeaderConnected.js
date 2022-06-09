import { useState } from "react";
import { NavLink } from 'react-router-dom';
// import toggleConnected from '../App'

function HeaderConnected () {
    const [isActive, setActive] = useState("false");

    const [lightMode, setLightMode] = useState("false")
    const toggleMenu = () => {
        setActive(!isActive);
    };

    const toggleLightMode = () => {
        setLightMode(!lightMode);
        document.getElementsByClassName("App")[0].classList.toggle('light-mode');
    }

    // const toggleConnected = (props) => {
    //     alert("eyo");
    //     super(props);
    //     this.setIsNotConnected(!this.isNotConnected);
    //     // setIsNotConnected(!isNotConnected);
        
    // };
    
    return (
        <nav className={isActive ? "navbar" : "navbar show-nav"}>
            <div className="navbar__logo">Logo</div>

            {/* <img src={logo} className="header-logo" alt="logo" />
            <div className="titre-balta">BALTA</div> */}

            <div className="container-links">
                <ul className="navbar__links">
                    <li className="navbar__link first"><NavLink to="/" activeClassName="active" onClick={toggleMenu}>Accueil</NavLink></li>
                    <li className="navbar__link second"><NavLink to="/mes-QCM" activeClassName="active" onClick={toggleMenu}>Mes QCM</NavLink></li>
                    <li className="navbar__link third"><NavLink to="/mes-corrections" activeClassName="active" onClick={toggleMenu}>Mes Corrections</NavLink></li>
                    {/* <li className="navbar__link fourth"><NavLink to="/" activeClassName="active" onClick={toggleMenu}>Corriger QCM</NavLink></li> */}
                    {/* <li className="navbar__link fifth"><NavLink to="/" activeClassName="active" onClick={toggleMenu}>Se Déconnecter</NavLink></li> */}
                    {/* <li className="navbar__link fifth"><NavLink to="/" activeClassName="active" onClick={toggleMenu}><span className="icon-logout"></span></NavLink></li> */}
                </ul>
                <div className="container-icon">
                    <span onClick={toggleLightMode} className={lightMode ? "icon-theme icon-dark-mode" : "icon-theme icon-light-mode"}></span>
                    <span /* onClick={toggleConnected}*/ className="icon-logout"></span>
                </div>
            </div>

            <button className="burger" onClick={toggleMenu}>
                <span className="bar"></span>
            </button>
        </nav>
    );
}

export default HeaderConnected;