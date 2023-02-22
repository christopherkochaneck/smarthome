import { Session } from 'next-auth';

export const redirectByPermission = (session: Session | null) => {
	const authenticationState = checkSession(session);
	if (authenticationState) return authenticationState;

	const unauthorized = redirectUnauthorized(session);
	if (unauthorized) return unauthorized;

	const denied = redirectDenied(session);
	if (denied) return denied;
};

export const redirectUnauthorizedPage = (session: Session | null) => {
	const authenticationState = checkSession(session);
	if (authenticationState) return authenticationState;

	const denied = redirectDenied(session);
	if (denied) return denied;
};

export const redirectDeniedPage = (session: Session | null) => {
	const authenticationState = checkSession(session);
	if (authenticationState) return authenticationState;

	const denied = redirectDenied(session);
	if (denied) return denied;
};

export const redirectSignInPage = (session: Session | null) => {
	const unauthorized = redirectUnauthorized(session);
	if (unauthorized) return unauthorized;

	const denied = redirectDenied(session);
	if (denied) return denied;
};

export const checkSession = (session: Session | null) => {
	if (!session) {
		return {
			redirect: {
				destination: '/api/auth/signin',
				permanent: false,
			},
		};
	}
};

const redirectUnauthorized = (session: Session | null) => {
	if (!session) return;

	if (session.user.permission === 'unauthorized') {
		return {
			redirect: {
				destination: '/auth/unauthorized',
				permanent: false,
			},
		};
	}
};

const redirectDenied = (session: Session | null) => {
	if (!session) return;

	if (session!.user.permission === 'denied') {
		return {
			redirect: {
				destination: '/auth/denied',
				permanent: false,
			},
		};
	}
};
