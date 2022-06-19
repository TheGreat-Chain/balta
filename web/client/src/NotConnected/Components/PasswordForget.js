import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import logo from '../../image/logo_balta_white 1.svg'

function PasswordForget() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await fetch('http://localhost:3001/api/user/forgotten-password', 
        {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
    
          body: JSON.stringify({
            email
          })

        });
    
        const data = await response.json();
        
        if(data.success === true) {
          alert(data.message);
          localStorage.setItem("email", email);
          navigate('/code-de-validation');
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

                <div className="content-title inscription">RÉCUPÉRATION DE MOT DE PASSE</div>
                
                <div className="subtitle">Nous vous enverrons un code de validation à l'adresse suivante :</div>
                <div className="input-container">
                    <div className="input-title">Adresse e-mail</div>
                    <form onSubmit={handleSubmit}>
                        <input  type="email" 
                                placeholder="adresse@xyz.com"
                                onChange = { function(e) { setEmail(e.target.value) } }
                                className="input-title"
                                required
                        />

                        <input className="primary-button" type="submit" value="ENVOYER"/>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PasswordForget;