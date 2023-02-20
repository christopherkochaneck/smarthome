import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import mongoose, { connect, model, Schema } from 'mongoose';
import { DBUser } from '../../../interfaces/user';
import bcrypt from 'bcrypt';

connect(`${process.env.DB_CONNECTION_STRING}`, {
	user: `${process.env.DB_USER}`,
	pass: `${process.env.DB_PASS}`,
});

const User =
	mongoose.models.User ||
	model(
		'User',
		new Schema({
			username: { type: String },
			password: { type: String },
		})
	);

export default NextAuth({
	session: { strategy: 'jwt' },
	secret: process.env.JWT_SECRET,
	pages: { signIn: '/auth/signIn' },
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			type: 'credentials',
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'username' },
				password: { label: 'Password', type: 'password', placeholder: 'password' },
			},
			async authorize(credentials, req) {
				const { username, password } = credentials as { username: string; password: string };

				const user = await User.findOne<any>({
					username: username,
				});

				if (!user || !(await bcrypt.compare(password, user.password))) {
					throw new Error('Wrong username or password.');
				}

				const session = { user: { id: user._id.toString(), name: user.username } };

				return session as any;
			},
		}),
	],
	callbacks: {
		redirect: async ({ baseUrl }) => {
			return baseUrl;
		},
		session: async ({ session, token }) => {
			session.user = token.user;
			return session;
		},
		jwt: async ({ token, user }) => {
			if (user !== undefined) {
				token.jwt = user.jwt;
				token.user = user.user;
			}
			return Promise.resolve(token);
		},
	},
});
