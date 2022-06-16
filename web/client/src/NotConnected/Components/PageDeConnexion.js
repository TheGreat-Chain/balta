import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import env from 'react-dotenv';

import logo from '../../image/logo_balta_white 1.svg'

function PageDeConnexion() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function connexion(event) {
        event.preventDefault();
        const response = await fetch('http:/localhost:3001/api/user/login', 
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
        alert(data.message);
        if(data.user){
          //indiquer qu'on est connecté
          window.location.href = '/' //page d'accueil
        }
        else{
          alert('please check your username and password')
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
                        />
                        <br/>

                        <div className="input-title">Mot de passe</div>
                        <input 
                            value = {password}
                            onChange = { function(e) { setPassword(e.target.value) } }
                            type="password" 
                            placeholder="Mot de passe" 
                            className="input-title"
                        />
                        <br/>

                        <input className="primary-button" type="submit" value="Connexion"/>
                    </form>
                    
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