import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { errorClg } from './loggers';

const generateToken = (id: mongoose.Schema.Types.ObjectId): string | Error => {
  try {
    const SECRET = process.env.SECRET;
    if (SECRET) {
      return jwt.sign({ id }, 'adfafd', {
        expiresIn: '30d',
      });
    } else {
      throw new Error('Unable to find a Secret!');
    }
  } catch (error) {
    errorClg(error.message);
    return error;
  }
};

export default generateToken;
