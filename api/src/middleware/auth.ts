import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import redisClient from '../redis/connection';

declare global {
  namespace Express {
    interface Request {
      user?: string | User;
      token?: string;
    }
  }
}


const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log('authenticateToken', req.cookies);
  const token = req.cookies['accessToken'];


  if (token == null) {
    res.sendStatus(401);
    return;
  }

  try {
    const isRevoked = await redisClient.get(token);

    if (isRevoked) {
      res.status(401).json({ message: 'Token has been revoked' });
      return;
    }

    console.log('token', token, process.env.ACCESS_TOKEN_SECRET);
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    req.user = user as User;
    req.token = token;

    next();
  } catch (error) {
    console.error('Error authenticating token:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default authenticateToken;
