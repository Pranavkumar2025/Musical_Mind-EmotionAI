import express from 'express';
import { login, signup, getCurrentUser } from '../controllers/authcontroller.js';
import authenticateToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// ✅ New protected route
router.get('/userinfo', authenticateToken, getCurrentUser);

// Optional: keep this only if needed
// router.get('/all', getAllUsers); 

export default router;
