import React, { useEffect, useState } from 'react';
import PostsAPI from '../services/postsAPI'
import PostQCM from "../services/postQCM"
import { NavLink } from "react-router-dom"

import { URL_CREATION } from "../services/config"

function ListeQCM() {

    const [isLoading, setIsLoading] = useState(true);
    const [listQcms, setListQcms] = useState(null);
    const newQCM = {
        "titre" : "Nouveau QCM",
        "date" : "enTimeStamp",
        "duree" : 10,
        "exemplaire" : 20,
        "totalPoints" : 20,
        "pointNegatif" : true,
        "questions" : []
    };

    useEffect(() => {
        fetchAllPosts();
    }, []);

    const genNewQCM = async () => {
        await PostQCM.createQCM(newQCM)
        const data = await PostsAPI.findAll();
        document.location.href = URL_CREATION + "/" + data[data.length - 1].id;
    }

    const deleteQCM = (qcm) => {
        PostQCM.deleteQCM(qcm.id).then((res) => fetchAllPosts(res));
        //Mettre la pop up de "êtes vous sur de vouloir supprimer"
    }

    const fetchAllPosts = async () => {
        // setIsLoading(true);
        const data = await PostsAPI.findAll();
        setListQcms(data);
        setIsLoading(false);
    }

    //Prochain objectif, quand je clique sur "nouveau QCM" ça post un truc "défault" d'un QCM dans le json
    //Ensuite, faire en sorte de pouvoir modifier le titre du QCM. Pour cela, quand un utilisateur clique sur un QCM,
        //Ca crée une variable locale sous une forme JSON, qui sera modifier quand l'utilisateur modifiera un truc
        //Et quand l'utilisateur clique sur sauvegarder, ça POST cette variable en supprimant l'ancienne version

    return (
        <div className="mes-qcm">
            <div className="en-tete-mes-qcm">
                <div className="title">TOUS LES QCM</div>
                <button href="/" className="primary-button" onClick={() => genNewQCM()}>NOUVEAU QCM</button>
            </div>
            

            {/* <a className="primary-button">NOUVEAU QCM<span className="icon-edit"></span></a> */}
            <div className="tab-content">
                <div className="header-tab">
                    <label className="checkbox-container">
                        <input type="checkbox" />
                        <span className="checkbox-icon-checkmark"></span>
                    </label>
                    <div className="tab-title">Nom du QCM</div>
                    <div className="tab-title">Nombre de questions</div>
                    <div className="tab-title">Etat</div>
                    <div className="tab-title">Moyenne classe dernière éval</div>
                    <div className="tab-title">Actions</div>
                </div>
                <div>
                    {isLoading ? <h1>Loading..</h1> : listQcms.map(qcm =>
                    <div>
                        <div className="ligne-tab">
                            <label className="checkbox-container">
                                <input type="checkbox" />
                                <span className="checkbox-icon-checkmark"></span>
                            </label>
                            <div className="tab-title">{qcm.titre}</div>
                            <div className="tab-title">{qcm.questions.length}</div>
                            <div className="tab-title">Etat</div>
                            <div className="tab-title">-</div>
                            
                            <div className="tab-title">
                                <span className="icon-delete" onClick={() => deleteQCM(qcm)}></span>
                                <NavLink to={`/creation-qcm/${qcm.id}`}><span className="icon-edit"></span></NavLink>
                                <span className="icon-export"></span>
                            </div>
                        </div>
                    </div>)}

                </div>
                {/* <div className="ligne-tab">
                    <label className="checkbox-container">
                        <input type="checkbox" />
                        <span className="checkbox-icon-checkmark"></span>
                    </label>
                    <div className="tab-title">Nom du QCM</div>
                    <div className="tab-title">Nombre de questions</div>
                    <div className="tab-title">Etat</div>
                    <div className="tab-title">Moyenne classe dernière éval</div>
                    <div className="tab-title">Actions</div>
                </div> */}

                
            </div>
        </div>
    )

    // return (
        
    // );
}

export default ListeQCM;