import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import logo from '../../image/logo_balta_white 1.svg'

function ValidateCode() {
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(localStorage.getItem("email"));

        const response = await fetch('http://localhost:3001/api/user/validate-code', 
        {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
    
          body: JSON.stringify({
            email : localStorage.getItem("email"),
            code
          })
        });
    
        const data = await response.json();
        
        if(data.success === true){
          console.log("données : " + JSON.stringify(data));
          alert(data.message);
          //navigate('/changer-mot-de-passe');
        }
        else{
            alert(data.message);
        }
    }

    return (
        <div className="password-forget-page">
            <div className="main-content">
                <img src={logo} className="logo" alt="logo" />
                <div className="slogan">Créer, cochez, c'est corrigé !</div>

                <div className="content-title inscription">Validation du code</div>
                
                <div className="subtitle">Entrez le code de validation reçu à l'adresse email renseignée</div>
                <div className="input-container">
                    <div className="input-title">Code de validation</div>
                    <form onSubmit={handleSubmit}>
                        <input  type="text" 
                                placeholder="Code de validation"
                                onChange = { function(e) { setCode(e.target.value) } }
                                className="input-title"
                                minLength="6"
                                required
                        />

                        <input className="primary-button" type="submit" value="ENVOYER"/>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ValidateCode;