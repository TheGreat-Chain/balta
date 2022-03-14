import express from "express";
import controller from "../controllers/queries";

const router = express.Router();

router.get('/users', controller.getAllUsers);
//router.get('queries/',controller.)
export default router;