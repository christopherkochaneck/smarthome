import type { NextPage } from 'next';
import { LayoutWrapper } from '../components/layout/layoutWrapper';

const Settings: NextPage = () => {
	return (
		<LayoutWrapper showAppbar={true} showAppbarIcon={false} appBarTitle="Settings">
			<>
				<div className="text-white">Coming soon</div>
			</>
		</LayoutWrapper>
	);
};

export default Settings;
