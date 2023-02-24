import { permission } from './permission';

export type authUser = {
	id: string;
	name: string;
	permission: permission;
};
