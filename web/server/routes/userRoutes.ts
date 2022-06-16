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
 import userController from '../controllers/userController';
 import extractJWT from '../middleware/extractJWT';

 const router = express.Router();
 
 router.get('/validateToken', extractJWT, userController.validateToken);
 router.post('/register', userController.register);
 router.post('/login', userController.login);
 router.get("/logout", extractJWT, (req, res) => {
    return res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Vous allez être déconnecté." });
  });
 
 export = router;