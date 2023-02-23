import { permission } from './../interfaces/permission';
import axios from 'axios';
import { BASE_URL } from '../config/env';

export const getUsers = async () => {
	const res = await axios({
		method: 'get',
		url: `${BASE_URL}/api/user`,
	});
	return res.data;
};

export const addUser = async (
	authorization: string,
	data: { username: string; password: string }
) => {
	await axios({
		url: `${BASE_URL}/api/user`,
		method: 'post',
		headers: { Authorization: authorization },
		data: { username: data.password, password: data.password, permission: 'unauthorized' },
	});
};

export const changeUserPermission = async (
	authorization: string,
	data: { userId: string; permission: permission }
) => {
	try {
		await axios.patch(
			`${BASE_URL}/api/user/${data.userId}`,
			{ permission: data.permission },
			{ headers: { Authorization: authorization } }
		);
	} catch (error) {}
};

export const deleteUser = async (data: { userId: string; authorization: string }) => {
	try {
		await axios.delete(`${BASE_URL}/api/user/${data.userId}`, {
			headers: { Authorization: data.authorization },
		});
	} catch (error) {}
};
