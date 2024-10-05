import { Router } from 'express';
import { getGitHubUserCount } from '../controllers/userCountController';
import authenticateToken from '../middleware/auth';

const router = Router();

router.get('/github-users', authenticateToken, getGitHubUserCount);

export default router;
