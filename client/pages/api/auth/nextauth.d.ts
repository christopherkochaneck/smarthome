import NextAuth from 'next-auth';
import { User } from '../../../context/UserContext';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
	interface User {
		jwt: string;
		user: any;
	}

	interface Session {
		user: any;
		jwt: string;
	}
}

declare module 'next-auth/jwt' {
	interface JWT extends DefaultJWT {
		jwt: string;
		user: User;
	}
}
