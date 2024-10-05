import { checkSchema } from 'express-validator';

export const registerSchema = checkSchema({
  username: {
    errorMessage: 'Invalid username',
    isLength: {
      options: { min: 1, max: 39 },
      errorMessage: 'Username must be between 1 and 39 characters long',
    },
    matches: {
      options: /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i,
      errorMessage: 'Username must start with a letter or number, and can contain hyphens',
    },
    custom: {
      options: (value) => {
        if (value.startsWith('-') || value.endsWith('-')) {
          throw new Error('Username cannot start or end with a hyphen');
        }
        if (value.includes('--')) {
          throw new Error('Username cannot contain consecutive hyphens');
        }
        return true;
      },
    },
  },
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: 'Password should be at least 8 chars',
    },
  },
});
