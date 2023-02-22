import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { redirectByPermission } from '../../util/redirect';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);

	const state = redirectByPermission(session);
	if (state) return state;

	return { props: {} };
};

export const NoPermission: NextPage = () => {
	const router = useRouter();
	return (
		<div className="w-screen h-screen bg-darkgrey flex items-center justify-items-center pl-8 pr-8">
			<span className="flex flex-col gap-2">
				<div className="rounded-xl bg-grey p-4 text-white flex flex-col items-center gap-4">
					<span className="self-center text-3xl">
						<strong>Your Request was denied!</strong>
					</span>
					<p>
						You have no permission to go to this page.
						<br />
						Press the button below to be redirected to the Start Page.
					</p>
				</div>
				<button
					onClick={() => router.push('/')}
					className="bg-black rounded-xl text-white pl-4 pr-4 pt-2 pb-2"
				>
					Go back to Start Page
				</button>
			</span>
		</div>
	);
};

export default NoPermission;
