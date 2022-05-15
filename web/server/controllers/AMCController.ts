/**
 * 
 * File : AMCController.ts
 * All the callback functions corresponding to some routes.
 * 
 * Functions related to AMC Latex :
 * - createNewProject
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
 import mongoose from 'mongoose';

 import logging from '../config/logging';

 /** Creates a new AMC-Latex project. 
  *  It is a unique folder that has the userID as a name.
  *  Not a callback function.
  * 
  * @userID : 1 user <=> 1 folder. To keep every folder unique, they are named as the user's id in mongoDB
  * @return : the error message if there is one
  */
  export function createNewProject (userID : String) {

    let projectPath = `$HOME/Projets-QCM/${userID}`

    exec(`mkdir ${projectPath}/$1 && mkdir ${projectPath}/$1/cr && mkdir ${projectPath}/$1/cr/corrections && mkdir ${projectPath}/$1/cr/corrections/jpg && mkdir ${projectPath}/$1/cr/corrections/pdf && mkdir ${projectPath}/$1/cr/diagnostic && mkdir ${projectPath}/$1/cr/zooms && mkdir ${projectPath}/$1/data && mkdir ${projectPath}/$1/exports && mkdir ${projectPath}/$1/scans && mkdir ${projectPath}/$1/copies`
        , (error, stdout, stderr) => {
            if(error) {
                console.log(error.message);
                return error.message;
            }
            if(stderr) {
                console.log(stderr)
                return stderr
            }
            console.log(stdout);
     });
}




