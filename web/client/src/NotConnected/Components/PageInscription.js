import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import logo from '../../image/logo_balta_white 1.svg'

function PageInscription() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    function passwordsEven() {
        return(password2 === password);
    }

    async function registerUser(event) {
        event.preventDefault();
        console.log('YOO');  

        const response = await fetch('http://localhost:3001/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
            })
        });

        const data = await response.json();

        if(data.success) {
            navigate.push('/login')
        }
        else
            toast(data.message);
    }

    return (
        <div className="inscription-page">
            <div className="main-content">
                <img src={logo} className="logo" alt="logo" />
                <div className="slogan">Créer, cochez, c'est corrigé !</div>

                <div className="content-title">INSCRIPTION</div>
                
                <div className="input-container">
                    <form onSubmit={registerUser}>
                        <input 
                            value = {username}
                            onChange = { function(e) { setUsername(e.target.value) } }
                            type="text" 
                            placeholder="Votre identifiant"
                            
                        />
                        <br/>

                        <input 
                            value = {email}
                            onChange = { function(e) { setEmail(e.target.value) } }
                            type="email" 
                            placeholder="adresse@xyz.com" 
                            />
                        <br/>

                        <input 
                            value = {password}
                            onChange = { function(e) { setPassword(e.target.value) } }
                            type="password" 
                            placeholder="Mot de passe" 
                        />
                        <br/>

                        <input 
                            value = {password2}
                            onChange = {    function(e) { 
                                                setPassword2(e.target.value);
                                                if(!passwordsEven){
                                                    toast("Les mots de passe ne correspondent pas. Réessayez.");
                                                    setPassword2("");
                                                }
                                            } 
                                        }
                            type="password" 
                            placeholder="Confirmez le mot de passe"
                        />
                        <ToastContainer/>
                        <br/>

                        <input type="submit" value="INSCRIPTION"/>
                    </form>                   
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