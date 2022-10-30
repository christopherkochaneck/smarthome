import { NextPage } from 'next';
import router from 'next/router';
import { LayoutWrapper } from '../components/layout/layoutWrapper';
import { Divider } from '../components/ui/list/components/divider/Divider';
import { ListTile } from '../components/ui/list/components/listTile/ListTile';

const Settings: NextPage = () => {
	return (
		<LayoutWrapper showAppbar appBarTitle="Settings">
			<div className="flex flex-col">
				<ListTile title="Open Admin Panel" onClick={() => router.push('/admin/adminPanel')} />
				<Divider />
				<ListTile title="Show Power Log" onClick={() => router.push('/powerLog')} />
				<Divider />
			</div>
		</LayoutWrapper>
	);
};

export default Settings;
