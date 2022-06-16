import LogiqueModale from "./CreationQuestion/LogiqueModale";
import Modale from "./CreationQuestion/Modale";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostAPI from "../services/postsAPI"

import PostQCM from "../services/postQCM"

// import { URL_APP } from "../services/config"

import { NavLink } from "react-router-dom"

function EditionQCM() {
    const {revele, toggle} = LogiqueModale();

    const { id } = useParams();
    let [qcm, setQcm] = useState(null);
    let [isLoading, setIsLoading] = useState(true);
    let [question, setQuestion] = useState([]);

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = async () => {
        // console.log(id);
        const data = await PostAPI.findOne(id);
        // console.log(data);
        setQcm(data);
        setIsLoading(false);
    }

    const toggleQuestion = async (question) => {
        setQuestion(question);
        toggle();
    }

    const addQuestion = async () => {
        const data = {
            "intitule": "Nouvelle Question",
            "points": 2,
            "hasMultChoices": false,
            "reponses": [{}]
          }
        setQuestion(data);
        toggle();
    }

    const sauvegarder = () => {
        const valueInput = document.getElementById('input-titre').value;
        console.log(valueInput);
        const data = {
            ...qcm,
            "titre" : valueInput,
            "duree" : 20,
            "questions" : [
                ...qcm.questions,
                {
                    "intitule": "Nouveau test",
                    "points": 2,
                    "hasMultChoices": false,
                    "reponses": [{}]
                }]
        };
        PostQCM.modifyQCM(qcm.id, data);
        //Rajouter la récupération de toute les données depuis notre application
    }

    const deleteQuestion = (index) => {
        qcm.questions.splice(index, 1);
        PostQCM.modifyQCM(qcm.id, qcm).then(() => fetchPost());
    }


    return (
        <div className="creation-qcm">
            <Modale 
                revele = {revele}
                cache = {toggle}
                question = {question}
                setQuestion = {setQuestion}
            />
            {/* Appelle l'élément Modale en lui passant en parametre
            revele, la variable
            cache, la fonction toggle permettant d'ouvrir ou fermer la modale*/}
            
            <div className="title">CREATION QCM</div>

            
            {/* <a className="primary-button">NOUVEAU QCM<span className="icon-edit"></span></a> */}
            <div className="header-page">
                <div className="titre-qcm">
                    <div className="title-qcm">Titre du QCM</div>
                    {isLoading ?<h3>Loading ..</h3> : <input id="input-titre" defaultValue={qcm.titre} placeholder="Titre du QCM"></input>}
                </div>

                {isLoading ? <div className="nombre-question">Loading ..</div> : <div className="nombre-question">{qcm.questions.length} questions </div>}

                <div className="container-button">
                    <button className="secondary-button" onClick={() => addQuestion()}>AJOUTER UNE QUESTION</button>
                    <NavLink to="/mes-qcm"><button href="/" className="primary-button" onClick={() => sauvegarder()}>SAUVEGARDER</button></NavLink>
                </div>
            </div>

            <div className="tab-content">
                <div className="header-tab">
                    <label className="checkbox-container">
                        <input type="checkbox" />
                        <span className="checkbox-icon-checkmark"></span>
                    </label>
                    <div className="tab-title">Questions</div>
                    <div className="tab-title">Choix multiple</div>
                    <div className="tab-title">Points</div>
                    <div className="tab-title">Actions</div>
                </div>

                {isLoading ? <h1>Loading..</h1> : qcm.questions.map((question, index) => 
                <div>
                    <div className="ligne-tab">
                        <label className="checkbox-container">
                            <input type="checkbox" />
                            <span className="checkbox-icon-checkmark"></span>
                        </label>
                        <div className="content-ligne-tab">{question.intitule}</div>
                        <div className="content-ligne-tab">{question.hasMultChoices ? "oui" : "non"}</div>
                        <div className="content-ligne-tab">{question.points}</div>
                        <div className="container-actions">
                            <span className="icon-delete" onClick={(() => deleteQuestion(index))}></span>
                            <span className="icon-edit" onClick={() => toggleQuestion(question)}></span>
                        </div>
                    </div>
                    

                </div>)}
               
            </div>
            
        </div>
    );
}

export default EditionQCM;