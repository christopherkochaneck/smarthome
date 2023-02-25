import { permission } from './../interfaces/permission';
import axios from 'axios';
import { BASE_URL } from '../config/env';
import { authUser } from '../interfaces/authUser';

export const getUsers = async (authorization: string) => {
	try {
		const res = await axios({
			method: 'get',
			url: `${BASE_URL}/api/user`,
			headers: { Authorization: authorization },
		});
		return res.data;
	} catch (error) {}
};

export const addUser = async (data: { username: string; password: string }) => {
	try {
		const res = await axios({
			url: `${BASE_URL}/api/user`,
			method: 'post',
			data: { username: data.username, password: data.password, permission: 'unauthorized' },
		});
		const { _id: id, username: name, permission } = res.data;
		const authUser: authUser = { id, name, permission };
		return authUser;
	} catch (error) {}
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
	} catch (error: any) {
		return error.message;
	}
};

export const deleteUser = async (data: { userId: string; authorization: string }) => {
	try {
		await axios.delete(`${BASE_URL}/api/user/${data.userId}`, {
			headers: { Authorization: data.authorization },
		});
	} catch (error) {}
};
