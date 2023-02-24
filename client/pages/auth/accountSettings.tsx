import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { getSession, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { User } from 'tabler-icons-react';
import { LayoutWrapper } from '../../components/layout/layoutWrapper';
import { Avatar } from '../../components/ui/avatar/avatar';
import { BASE_URL } from '../../config/env';
import { useToast } from '../../context/ToastContext';
import { authUser } from '../../interfaces/authUser';
import { redirectByPermission } from '../../util/redirect';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);

	const state = redirectByPermission(session);
	if (state) return state;

	return { props: {} };
};

export const AccountSettings: NextPage = () => {
	const [avatarColor, setAvatarColor] = useState<string>('');
	const session = useSession();
	const router = useRouter();
	const { addToast } = useToast();

	return (
		<>
			<LayoutWrapper appBarTitle="Account Settings" showAppbar showBackButton>
				<div className="flex flex-col items-center text-white gap-4">
					<span className="flex flex-col items-center gap-2">
						<Avatar
							background="black"
							dimension={75}
							padding={20}
							icon={<User className="text-white w-14 h-14" />}
						/>
						<div>{session.data?.user.name}</div>
					</span>
					<span className="flex flex-col gap-2 w-full">
						<button
							onClick={() => router.push('/auth/accountCredentials')}
							className="p-4 pt-2 pb-2 bg-black rounded-lg"
						>
							Change Password
						</button>
						<button onClick={() => signOut()} className="p-4 pt-2 pb-2 bg-black rounded-lg">
							Log Out
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
					</span>
				</div>
			</LayoutWrapper>
		</>
	);
};

export default AccountSettings;
