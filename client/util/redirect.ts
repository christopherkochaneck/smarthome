import { Session } from 'next-auth';

export const redirectByPermission = (session: Session | null) => {
	if (!session) {
		return { redirect: { destination: '/auth/signIn', permanent: false } };
	}
	switch (session.user.permission) {
		case 'unauthorized':
			return { redirect: { destination: '/auth/unauthorized', permanent: false } };
		case 'denied':
			return { redirect: { destination: '/auth/denied', permanent: false } };
		default:
			break;
	}
};

export const redirectUnauthorized = (session: Session | null) => {
	if (!session) {
		return { redirect: { destination: '/auth/signIn', permanent: false } };
	}
	if (session.user.permission === 'denied') {
		return { redirect: { destination: '/auth/denied', permanent: false } };
	}
};

export const redirectDenied = (session: Session | null) => {
	if (!session) {
		return { redirect: { destination: '/auth/signIn', permanent: false } };
	}
};
