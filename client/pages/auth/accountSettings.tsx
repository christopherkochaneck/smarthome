import { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { User } from 'tabler-icons-react';
import { LayoutWrapper } from '../../components/layout/layoutWrapper';
import { Avatar } from '../../components/ui/avatar/avatar';

interface Props {
	session: Session;
}

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

export const AccountSettings: NextPage<Props> = ({ session }) => {
	const router = useRouter();
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
					<div>{session.user.name}</div>
					<button onClick={() => signOut()} className="p-4 pt-2 pb-2 bg-black rounded-lg">
						Log Out
					</button>
					<button
						onClick={() => router.push('/auth/accountCredentials')}
						className="p-4 pt-2 pb-2 bg-black rounded-lg"
					>
						Change Password
					</button>
				</div>
			</LayoutWrapper>
		</>
	);
};

export default AccountSettings;
