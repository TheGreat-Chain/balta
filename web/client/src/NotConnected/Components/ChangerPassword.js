import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import logo from '../../image/logo_balta_white 1.svg'

function ChangerPassword() {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await fetch('http://localhost:3001/api/user/change-password', 
        {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
    
          body: JSON.stringify({
            email : localStorage.getItem("email"),
            password
          })

        });
    
        const data = await response.json();
        
        if(data.success === true) {
          alert(data.message);
          localStorage.removeItem("email");
          navigate('/connexion');
        }
        else {
            alert(data.message);
        }
    }

    return (
        <div className="password-forget-page">
            <div className="main-content">
                <img src={logo} className="logo" alt="logo" />
                <div className="slogan">Créer, cochez, c'est corrigé !</div>

                <div className="content-title inscription">CHANGER LE MOT DE PASSE</div>
                
                <div className="subtitle">Vous pouvez maintenant choisir votre nouveau mot de passe</div>
                <div className="input-container">
                    <div className="input-title">Nouveau mot de passe</div>
                    <form onSubmit={handleSubmit}>
                        <input 
                            value = {password}
                            onChange = { function(e) { setPassword(e.target.value) } }
                            type="password" 
                            placeholder="Mot de passe" 
                            className="input-title"
                            minlength="6"
                            required
                        />
                        <input className="primary-button" type="submit" value="ENVOYER"/>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChangerPassword;