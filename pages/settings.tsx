import type { NextPage } from 'next';
import { LayoutWrapper } from '../components/layout/layoutWrapper';

const Settings: NextPage = () => {
	return (
		<LayoutWrapper showAppbar={true} showAppbarIcon={false}>
			<>
				<div className="flex flex-col gap-4">
					<div className="grid grid-cols-2 gap-4 text-zinc-600 ">
						<div>E-Mail:</div>
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
