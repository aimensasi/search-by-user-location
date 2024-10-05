import { Router } from 'express';
import { register, login, logout } from '../controllers/authController';
import { registerSchema } from './validation/register.validation';
import { loginSchema } from './validation/login.validation';
import authenticateToken from '../middleware/auth';

const router = Router();

router.post('/register', registerSchema, register);
router.post('/login', loginSchema, login);
router.delete('/logout', authenticateToken, logout);
export default router;
