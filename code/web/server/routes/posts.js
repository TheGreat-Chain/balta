import express from 'express';
import { getPosts } from '../controllers/posts.js';
const router = express.Router();

router.get('/', getPosts);

//fichier exporté pour être utiliser dans index.js 
export default router;