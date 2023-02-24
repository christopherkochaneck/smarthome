import jwt from 'jsonwebtoken';
import { permission } from '../interfaces/permission';

export const generateAuthToken = (data: { id: string; name: string; permission: permission }) => {
	const secret = process.env.JWT_SECRET;
	if (!secret) throw Error('No JWT Secret');

	const token = jwt.sign(data, secret);

	return token;
};
