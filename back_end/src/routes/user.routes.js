import express from 'express';
const router = express.Router();
import { signup } from '../controllers/users.controllers.js';
import { login } from '../controllers/users.controllers.js';
import { logout } from '../controllers/users.controllers.js';
import { authMiddleware } from '../middlewares/user.middleware.js';
import { purchases } from '../controllers/users.controllers.js';

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)

router.get('/allPurchases',authMiddleware,purchases)
router.get('/me', authMiddleware, (req, res) => {
  res.status(200).json({
    loggedIn: true,
    userId: req.user.id
  });
});


export default router;