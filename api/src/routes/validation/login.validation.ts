import { checkSchema } from 'express-validator';

export const loginSchema = checkSchema({
  username: {
    errorMessage: 'Username is required',
    notEmpty: true,
  },
  password: {
    errorMessage: 'Password is required',
    notEmpty: true,
  },
});
