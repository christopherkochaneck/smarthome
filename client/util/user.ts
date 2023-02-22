import axios from 'axios';
import { BASE_URL } from '../config/env';
import { DBUser } from '../interfaces/user';

export const getUsers = async () => {
	const res = await axios({ method: 'get', url: `${BASE_URL}/api/user` });
	return res.data;
};

export const changeUserPermission = async (userId: string, permission: string) => {
	try {
		await axios.patch(`${BASE_URL}/api/user/${userId}`, { permission: permission });
	} catch (error) {}
};

export const deleteUser = async (userId: string) => {
	try {
		await axios.delete(`${BASE_URL}/api/user/${userId}`);
	} catch (error) {}
};
