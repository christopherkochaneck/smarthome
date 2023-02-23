import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied. No token provided');

  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) return res.status(500).send('Internal server error');

  try {
    jwt.verify(token, secretKey);
    next();
  } catch (ex) {
    console.log(ex);
    return res.status(400).send('Invalid token.');
  }
};
