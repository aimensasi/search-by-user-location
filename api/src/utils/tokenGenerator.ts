import { User } from "../models/User";
import jwt from 'jsonwebtoken';

export const generateAccessToken = (user: User) => {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
  const accessToken = jwt.sign({ username: user.username }, accessTokenSecret, { expiresIn: '1h' });

  return accessToken;
}
