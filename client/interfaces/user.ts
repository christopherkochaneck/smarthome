export type DBUser = {
	_id: string;
	username: string;
	permission: 'admin' | 'user' | 'unauthorized' | 'denied';
};
