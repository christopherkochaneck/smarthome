import { authUser } from '../interfaces/authUser';

export const initializeLocalStorage = () => {
	localStorage.setItem('users', JSON.stringify([]));
};

export const getUsersFormLocalStorage = (): authUser[] => {
	if (localStorage.users === '[null]') initializeLocalStorage();
	if (localStorage.users === undefined) initializeLocalStorage();
	return JSON.parse(localStorage.users);
};

export const addUserToLocalStorage = (user: authUser) => {
	if (!user) return;
	const users = getUsersFormLocalStorage();
	const storageUser = users.find((x) => x.id === user.id);
	if (storageUser) return;

	users.push(user);

	localStorage.setItem('users', JSON.stringify(users));
};

export const removeUserFromLocalStorage = (user: authUser) => {
	let users = getUsersFormLocalStorage();
	users.filter((x: authUser) => x.id !== user.id);
	localStorage.setItem('users', JSON.stringify(users));
};

export const updateUserInLocalStorage = (user: authUser) => {
	let users = getUsersFormLocalStorage();
	const index = users.findIndex((x) => x.id === user.id);
	users[index] = user;
};

export const clearUserLocalStorage = () => {
	initializeLocalStorage();
};
