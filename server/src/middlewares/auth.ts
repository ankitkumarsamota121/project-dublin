import jwt from 'jsonwebtoken';
import { errorClg } from '../utils/loggers';
import { IAuth } from '../interfaces/userInterfaces';

export const protect = (header: string): IAuth => {
  if (!header) return { isAuth: false };

  const token: any = header.split(' ')[1];
  if (!token) return { isAuth: false };

  const SECRET = process.env.SECRET;
  if (!SECRET) {
    throw new Error('Something secret is missing!');
  }

  let decodedToken: any;
  try {
    decodedToken = jwt.verify(token, SECRET);
  } catch (err) {
    errorClg(err.message);
    return { isAuth: false };
  }

  if (!decodedToken) return { isAuth: false };

  return { isAuth: true, userId: decodedToken.id };
};
