import axios from 'axios';
import { BASE_URL } from '../config/env';
import { DBUser } from '../interfaces/user';

export const getUsers = async () => {
	const res = await axios({ method: 'get', url: `${BASE_URL}/api/user` });
	return res.data;
};
