import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import mongoose, { connect, model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { authUser } from '../../../interfaces/authUser';
import { generateAuthToken } from '../../../util/auth';

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
			permission: { type: String },
		})
	);

export type authSession = {
	user: authUser;
	token: string;
};

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

				const { _id: id, username: name, permission } = user;

				const session = {
					user: { id: id.toString(), name: name, permission: permission },
				};

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
			session.jwt = token.jwt;
			return session;
		},
		jwt: async ({ token, user }) => {
			if (user !== undefined) {
				token.jwt = generateAuthToken({
					id: user.user.id,
					name: user.user.name,
					permission: user.user.permission,
				});
				token.user = user.user;
			}
			return token;
		},
	},
});
