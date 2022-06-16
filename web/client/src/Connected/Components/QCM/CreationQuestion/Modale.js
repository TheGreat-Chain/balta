import React, { Fragment, useState, useEffect } from "react";
import axios from 'axios';

//Si la variable revele passer en props est égale à true
//affiche toutes la modale
//Sinon return null et affiche rien
function Modale ({revele, cache, question}) {
    // const [data, setData] = useState([]);

    // // similaire à "componentDidMount" et "componentDidUpdate"
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await axios(
    //             'http://localhost:3000/posts',
    //         );

    //         setData(result.data);
    //     }
    //     fetchData()
    // }, []);
    
    return (revele ? (
    <React.Fragment>
        <div className="overlay"></div>
        <div className="creation-question">
            {/* <button type="button" className="close" onClick={cache}>
                <span>&times;</span>
            </button> */}

            <div className="title">EDITION QUESTION</div>
 
            <div className="titre-enonce">Enoncé de la question</div>
            <input placeholder="Enoncé de la question" defaultValue={question.intitule} />
            <div className="container-des-reponses">
                
                {/* <ul>
                    {data.map(item => (
                        <li>
                            <p>{item.id}</p>
                            <p>Faut que je me démerde pour afficher des données du json. En commençant par afficher tous les intitulés des questions du json</p>
                            <p>Ensuite une fois que je sais comment récupérer quelle donnée, je génère des réponses avec notamment le truc en commentaire en dessous</p>
                            <p>PS : Pour démarrer le server json, "json-server --watch db.json" dans le fichier "Deesktop/BALTA/Json-api"</p>

                        </li>
                    ))}
                </ul> */}
                {question.reponses.map(reponse => 
                <div className="container-reponse">
                    <span className="icon-delete"></span>
                    <div className="reponse">
                        <div>Réponse 1</div>
                        <input placeholder="Entrer une réponse" defaultValue={reponse.content}/>
                    </div>

                    <div className="choix-bonne-reponse">
                        <div>Bonne réponse</div>
                        <div className="checkbox-position">
                            <label className="checkbox-container">
                                <input type="checkbox"/>
                                <span className="checkbox-icon-checkmark"></span>
                            </label>
                        </div>
                    </div>
                </div>
                )}

                
                
                
                <a className="secondary-button">AJOUTER UNE REPONSE</a>
            </div> {/* Container des réponses */}
            
            <a className="primary-button" onClick={cache}>SAUVEGARDER</a>
        </div>

    </React.Fragment>
    ) : null);
    
}    


// const Modale = ({revele, cache}) => revele ?(
//     const [data, setData] = useState([]);

//     // similaire à "componentDidMount" et "componentDidUpdate"
//     useEffect(() = > {
//         const fetchData = async () => {
//             const result = await axios(
//                 'http://localhost:3000/posts',
//             );

//             setData(result.data);
//         }
//     })

//     return (
//     <React.Fragment>
//         <div className="overlay"></div>
//         <div className="creation-question">
//             {/* <button type="button" className="close" onClick={cache}>
//                 <span>&times;</span>
//             </button> */}

//             <div className="title">EDITION QUESTION</div>

//             <div className="titre-enonce">Enoncé de la question</div>
//             <input placeholder="Enoncé de la question" />
//             <div className="container-des-reponses">
//                 {/* <div className="container-reponse">
//                     <span className="icon-delete"></span>
//                     <div className="reponse">
//                         <div>Réponse 1</div>
//                         <input placeholder="Réponse 1" />
//                     </div>

//                     <div className="choix-bonne-reponse">
//                         <div>Bonne réponse</div>
//                         <div className="checkbox-position">
//                             <label className="checkbox-container">
//                                 <input type="checkbox" />
//                                 <span className="checkbox-icon-checkmark"></span>
//                             </label>
//                         </div>
//                     </div>
//                 </div> */}

                
                
                
//                 <a className="secondary-button">AJOUTER UNE REPONSE</a>
//             </div> {/* Container des réponses */}
            
//             <a className="primary-button">SAUVEGARDER</a>
//         </div>

//     </React.Fragment>
//     );
// ) : null;

export default Modale;