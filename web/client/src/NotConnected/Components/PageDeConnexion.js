import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';


import logo from '../../image/logo_balta_white 1.svg'

function PageDeConnexion() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function connexion(event) {
        event.preventDefault();
        const response = await fetch('http://localhost:3001/api/user/login', 
        {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
    
          body: JSON.stringify({
            email,
            password,
          })

        });
    
        const data = await response.json();
        
        if(data.success === true){
          console.log("données : " + JSON.stringify(data));
          localStorage.setItem("access-token", data.token);
          navigate('/accueil');
        }
        else{
            alert(data.message);
        }
      }

    return (
        <div className="connexion-page">
            <div className="main-content">
                <img src={logo} className="logo" alt="logo" />
                <div className="slogan">Créer, cochez, c'est corrigé !</div>

                <div className="content-title">CONNEXION</div>
                
                <div className="input-container">
                    <form onSubmit={connexion}>
                        <div className="input-title">Adresse e-mail</div>
                        <input 
                            value = {email}
                            onChange = { function(e) { setEmail(e.target.value) } }
                            type="email" 
                            placeholder="adresse@xyz.com" 
                            className="input-title"
                            required
                        />
                        <br/>

                        <div className="input-title">Mot de passe</div>
                        <input 
                            value = {password}
                            onChange = { function(e) { setPassword(e.target.value) } }
                            type="password" 
                            placeholder="Mot de passe" 
                            className="input-title"
                            minlength="6"
                            required
                        />
                        <br/>

                        <input className="primary-button" type="submit" value="Connexion"/>
                    </form>
                    
                </div>

                <NavLink to="/password-forget"><div className="password-forget">Mot de passe oublié ?</div></NavLink>

                <NavLink to="/" className="primary-button">
                    {/* <input type="submit" value="connexion" className="primary-text">CONNEXION</input> */}
                </NavLink>
            
                <div className="button-subtitle">Pas encore de compte ? <NavLink to="/inscription">Créer un compte</NavLink></div>
            </div>
        </div>
    );
}

export default PageDeConnexion;