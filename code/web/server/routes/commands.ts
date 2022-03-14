import express from 'express';
import {CreateUser} from '../controllers/commands';
const router = express.Router();

router.post('/createUser', CreateUser);

export default router;