import { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession, signOut } from 'next-auth/react';
import { useToast } from '../../context/ToastContext';
import { deleteUser } from '../../util/user';

type Props = {
	session: Session;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);
	if (!session) {
		return {
			redirect: {
				destination: '/api/auth/signin',
				permanent: false,
			},
		};
	}

	return { props: { session } };
};

export const Denied: NextPage<Props> = ({ session }) => {
	const { addToast } = useToast();
	return (
		<div className="w-screen h-screen bg-darkgrey flex items-center justify-items-center pl-8 pr-8">
			<span className="flex flex-col gap-2">
				<div className="rounded-xl bg-grey p-4 text-white flex flex-col items-center gap-4">
					<span className="self-center text-3xl">
						<strong>Your Request was denied!</strong>
					</span>
					<p>
						Thanks for your interest.
						<br />
						It seems like the Admin(s) denied your application. <br />
						You can either log out of the current Session or delete your Account down below if you
						want to.
					</p>
				</div>
				<button
					onClick={() => signOut()}
					className="bg-black rounded-xl text-white pl-4 pr-4 pt-2 pb-2"
				>
					Log out
				</button>
				<button
					onClick={() => {
            //TODO: deletion not working
						deleteUser(session.user.id);
            addToast({ message: 'Account deleted', type: 'success' });
						signOut();
					}}
					className="bg-black rounded-xl text-white pl-4 pr-4 pt-2 pb-2"
				>
					Delete Account
				</button>
			</span>
		</div>
	);
};

export default Denied;
