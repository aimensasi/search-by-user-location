import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { db } from '../db/connection';
import { users } from '../db/schema';
import { validationResult } from 'express-validator';
import redisClient from '../redis/connection';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).json({ errors: result.array() });
      return;
    }

    const { username, password } = req.body;
    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.username, username),
    });

    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user: User = { username, password: hashedPassword };
    await db.insert(users).values(user);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).json({ message: 'Error registering user' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }

  const { username, password } = req.body;
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  });
  if (!user) {
    res.status(400).json({ message: 'Cannot find user' });
    return;
  }

  try {
    if (await bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign(
        { username: user.username },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '1m' }
      );
      res.json({ accessToken });
    } else {
      res.status(400).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  const token = req.token;
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    // Store the revoked token in Redis for 1 hour
    await redisClient.set(token, 'revoked', 'EX', 3600);

    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ message: 'Error logging out' });
  }
};
