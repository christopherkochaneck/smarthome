import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { getSession, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { User } from 'tabler-icons-react';
import { LayoutWrapper } from '../../components/layout/layoutWrapper';
import { Avatar } from '../../components/ui/avatar/avatar';
import { BASE_URL } from '../../config/env';
import { useToast } from '../../context/ToastContext';
import { redirectByPermission } from '../../util/redirect';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);

	const state = redirectByPermission(session);
	if (state) return state;

	return { props: {} };
};

export const AccountSettings: NextPage = () => {
	const session = useSession();
	const router = useRouter();
	const { addToast } = useToast();
	return (
		<>
			<LayoutWrapper appBarTitle="Account Settings" showAppbar showBackButton>
				<div className="flex flex-col items-center text-white">
					<span>
						<Avatar
							background="purple"
							dimension={0}
							padding={8}
							icon={<User className="text-white w-14 h-14" />}
						/>
					</span>
					<div>{session.data?.user.name}</div>
					<button onClick={() => signOut()} className="p-4 pt-2 pb-2 bg-black rounded-lg">
						Log Out
					</button>
					<button
						onClick={() => router.push('/auth/accountCredentials')}
						className="p-4 pt-2 pb-2 bg-black rounded-lg"
					>
						Change Password
					</button>
					<button
						className="p-2 bg-red-700 rounded-lg text-white"
						onClick={async () => {
							try {
								await axios({
									method: 'delete',
									url: `${BASE_URL}/api/user/${session.data?.user.id}`,
									headers: { Authorization: session.data?.jwt! },
								});
								signOut();
							} catch (error: any) {
								addToast({ message: error.message, type: 'error' });
							}
						}}
					>
						Delete Account
					</button>
				</div>
			</LayoutWrapper>
		</>
	);
};

export default AccountSettings;
