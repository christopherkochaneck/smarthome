import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
	providers: [
		GoogleProvider({
			name: 'google',
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
	],
	session: { strategy: 'jwt' },
	secret: process.env.GOOGLE_CLIENT_SECRET!,
	callbacks: {
		jwt: async ({ token, account }) => {
			if (account?.accessToken) {
				token.accessToken = account.accessToken;
			}
			return token;
		},
		redirect: async ({ url, baseUrl }) => {
			if (url === '/settings') {
				return Promise.resolve('/');
			}
			return Promise.resolve('/');
		},
	},
});
