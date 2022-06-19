import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



function ListeDesNotes () {
    const navigate = useNavigate();

    //redirection si deconnexion
    useEffect(function() {
        if(! localStorage.getItem('access-token')) {
            alert('Veuillez vous reconnecter.');
            navigate("/connexion");
        }
    }, []);
    // vérifier que l'user est bien connecté sinon rediriger.
    return (
        <div className="liste-des-notes">
            <div className="en-tete">
                <div className="title">CORRECTION DE "NOM QCM"</div>
                <div className="container-button">
                    <a href="/" className="secondary-button">DUPLIQUER LE QCM</a>
                    <a href="/" className="primary-button">SAUVEGARDER</a>
                </div>
            </div>
            

            <div className="tab-content">
                <div className="header-tab">
                    <label className="checkbox-container">
                        <input type="checkbox" />
                        <span className="checkbox-icon-checkmark"></span>
                    </label>
                    <div className="tab-title">Nom</div>
                    <div className="tab-title">Prénom</div>
                    <div className="tab-title">Note</div>
                    <div className="tab-title">Consulter</div>
                </div>

                <div className="ligne-tab">
                    <label className="checkbox-container">
                        <input type="checkbox" />
                        <span className="checkbox-icon-checkmark"></span>
                    </label>
                    <div className="content-ligne-tab">DE PILLOT COMTE DE COLIGNY CHATILLON EYO MAN HOW ARE YOU</div>
                    <div className="content-ligne-tab">DE PILLOT COMTE DE COLIGNY CHATILLON EYO MAN HOW ARE YOU</div>
                    <div className="content-ligne-tab">5/20</div>
                    <div className="container-actions">
                        <span className="icon-delete"></span>
                    </div>
                </div>
                <div className="ligne-tab">
                    <label className="checkbox-container">
                        <input type="checkbox" />
                        <span className="checkbox-icon-checkmark"></span>
                    </label>
                    <div className="content-ligne-tab">DUPONT</div>
                    <div className="content-ligne-tab">Eric</div>
                    <div className="content-ligne-tab">5/20</div>
                    <div className="container-actions">
                        <span className="icon-delete"></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListeDesNotes;
