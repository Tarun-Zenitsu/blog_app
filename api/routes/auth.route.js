import express from 'express';
import signpu from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signpu)

export default router;