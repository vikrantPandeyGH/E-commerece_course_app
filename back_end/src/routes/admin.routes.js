import express from 'express';
const router = express.Router();
import { adminSignUp,adminLogin,adminLogout } from '../controllers/admin.controllers.js';

router.post('/signup',adminSignUp)
router.post('/login',adminLogin)
router.post('/logout',adminLogout)

export default router;