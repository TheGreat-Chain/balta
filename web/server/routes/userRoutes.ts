/**
 * File : userRoutes.ts
 * Routes related to user registration, login and token validation.
 * 
 * ------------------------------------------------------------------------------------
 *  
 * A route permits to execute some actions depending on which URI the user
 * activates.
 * 
 * The action to do depends on the HTTP request methods :
 * - GET    : get or read resources
 * - POST   : create a new resource
 * - PUT    : Update an existing resource
 * - DELETE : Deletes a resource
 * 
 */

 import express from 'express';
 import { validateToken, register, login, getAllUsers, deleteUser, getUserByID, updatePassword } from '../controllers/userController';
 import {getUserMCQs, createNewMCQ} from '../controllers/AMCController';
 import extractJWT from '../middleware/extractJWT';

 const router = express.Router();
 


 router.get('/validateToken', extractJWT, validateToken);

 router.post('/register', register);
 router.post('/login', login);

 router.get('/getAllUsers', extractJWT, getAllUsers);
 router.get('/getAllMCQs/:id', extractJWT, getUserMCQs);
 router.get('/getUserByID/:id', extractJWT, getUserByID);

 router.put('updatePassword:id',extractJWT, updatePassword);
 router.put('updateMCQ/:id', extractJWT, createNewMCQ); // requête PUT car on update le tableau UserMCQ's qui est déjà existant

 export = router;