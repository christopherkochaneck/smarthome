import { NextPage } from 'next';
import { signOut } from 'next-auth/react';

export const Unauthorized: NextPage = () => {
	return (
		<div className="w-screen h-screen bg-darkgrey flex items-center justify-items-center pl-8 pr-8">
			<span className="flex flex-col gap-2">
				<div className="rounded-xl bg-grey p-4 text-white flex flex-col items-center gap-4">
					<span className="self-center text-3xl">
						<strong>You&apos;re Unauthorized!</strong>
					</span>
					<p>
						It seems like your account has not been authorized yet. Please come back later. <br />
						If the verification is taking longer than 2 days, contact an Admin directly.
					</p>
				</div>
				<button
					onClick={() => signOut()}
					className="bg-black rounded-xl text-white pl-4 pr-4 pt-2 pb-2"
				>
					Log out
				</button>
			</span>
		</div>
	);
};

export default Unauthorized;
