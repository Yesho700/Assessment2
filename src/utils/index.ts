import { Request } from '@hapi/hapi';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user.model';

const JWT_SECRET = process.env.JWT_SECRET ;

export function generateToken(user: IUser): string {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
}

export async function validateJWT(decoded: any, request: Request) {
  return { isValid: true };
}