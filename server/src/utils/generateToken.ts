import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { errorClg } from './loggers';

const generateToken = (id: string): string | Error => {
  try {
    const SECRET = process.env.SECRET;
    if (!SECRET) {
      throw new Error('Unable to find a Secret!');
    }

    return jwt.sign({ id }, SECRET, {
      expiresIn: '30d',
    });
  } catch (error) {
    errorClg(error.message);
    return error;
  }
};

export default generateToken;
