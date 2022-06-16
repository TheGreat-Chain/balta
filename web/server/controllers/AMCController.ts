/**
 * 
 * File : AMCController.ts
 * All the callback functions corresponding to some routes.
 * 
 * Functions related to AMC Latex :
 * - createNewMCQ
 * - getMCQ
 * - getMCQCorrections
 * - editMCQ
 * - deleteMCQ
 * - exportMCQ (to PDF)
 * - correctMCQ
 * - editQuestion (a question title, multiple answers (answer title and isCorrect))
 * - deleteQuestion
 * 
 * @author Balta Team
 */
 import { NextFunction, Request, Response } from 'express';
 import { exec } from 'child_process';
 import User from '../models/userSchema';
 import logging from '../config/logging';
import {ObjectId} from "mongodb";



/**
 * Permits to create a string from of an MCQ from a specific JSON object.
 * This string is then used to create a text file for AMC Latex.
 * 
 * Useful because we receive JSON data from the frontend.
 * 
 * @param qcmJson JSON object representing an MCQ
 * @returns String.
 */
 function jsonToString (qcmJson : any) {
    let qcmTxt = "# AMC-TXT source \n";
    qcmTxt += "#** -> question à choix multiple \n\n"
    qcmTxt += "PaperSize : A4\nLang : FR\nTitle: "+ qcmJson.titre+"\n\n";
    qcmTxt += "Presentation : Veuillez répondre aux questions ci-dessous du mieux que vous pouvez. Durée : "+qcmJson.duree+" minutes. Noté sur : "+qcmJson.totalPoints+" points\n"; 


    for(const question of qcmJson.questions){
        if(question.hasMultChoices){
            qcmTxt += "** "+question.intitule+"\n";
        }else{
            qcmTxt += "* "+question.intitule+"\n";
        }
        
        qcmTxt += "# POINTS : "+question.points + "\n";

        for(const response of question.reponses){
            if(response.isGoodAnswer){
                qcmTxt += "+ "+response.content+"\n";
            }else{
                qcmTxt += "- "+response.content+"\n";
            }
        }
        qcmTxt += "\n";
    } 
    return qcmTxt;
}

 /** Creates a new AMC-Latex MCQ. 
  * 
  *  1. Transforms JSON object in string with jsonToString
  *  2. Creates a text file from this string in the user's project folder
  *  3. Creates a PDF file, giveable to students for test.
  *  4. Stores the JSON object in the MongoDB.
  * 
  * @userID : 1 user <=> 1 folder. To keep every folder unique, they are named as the user's id in mongoDB
  * @return : the error message if there is one
  */
export function createNewMCQ (req : Request, res : Response, next : NextFunction) {

    const id = req.params.id
     const qcm = req.body
    //const projectPath = `$HOME/Projets-QCM/${userEmail}`
     const nbCopie = req.body.nbCopie
    //const qcmTxt = jsonToString(req.body.qcm)

     User.findOneAndUpdate(
         { _id: new ObjectId(id) },
         { $push: {UserMCQs: qcm}},(err: any) => {
             if (err) {
                 res.status(500).json({
                     success: false,
                     message: "BALTA_ERR_005 : Le QCM n'a pas été enregistré dans la BD."
                 })
             } else {
                 //TODO
                 // placer le txt dans projectPath
                 // generer le pdf

                 res.status(400).json({
                     success: true,
                     message: "SUCCESS : QCM ENREGISTRE DANS LA BD"
                 })
             }
         })



    /*exec(`auto-multiple-choice prepare --mode s --data data --filter plain --n-copies ${nbCopie} ${qcmTxt} > /dev/null 2> /dev/null`,
        (error, stdout, stderr) =>{
            if(error) {
                console.log(error.message);
                return error.message;
            }
            if(stderr) {
                console.log(stderr)
                return stderr
            }
            console.log(stdout);
        })*/
}

export function getUserMCQs (req : Request, res : Response, next : NextFunction) {

}


