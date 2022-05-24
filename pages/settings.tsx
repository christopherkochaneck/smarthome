import type { NextPage } from 'next';
import { LayoutWrapper } from '../components/layout/layoutWrapper';
// import { signIn, signOut, useSession } from 'next-auth/react';
// import Image from 'next/image';
// import { Avatar } from '../components/ui/avatar/avatar';

const Settings: NextPage = () => {
	// const { data: session, status } = useSession();

	return (
		<LayoutWrapper showAppbar={true} showAppbarIcon={false}>
			{/* {session ? ( */}
			<>
				<div className="flex flex-col gap-4">
					<div className="mx-auto">
						{/* <Avatar avatarUrl={session.user?.image!} dimension={100} /> */}
					</div>
					<div className="grid grid-cols-2 gap-4 text-zinc-600 ">
						<div>Username:</div>
						{/* <div>{session.user?.name}</div> */}
						<div>E-Mail:</div>
						{/* <div>{session.user?.email}</div> */}
					</div>
					<button onClick={() => null} className="text-white bg-zinc-800 p-2 rounded-lg">
						Logout
					</button>
				</div>
			</>
			{/* ) : null} */}
		</LayoutWrapper>
	);
};

export default Settings;
