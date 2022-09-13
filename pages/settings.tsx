import axios from 'axios';
import type { NextPage } from 'next';
import router from 'next/router';
import { LayoutWrapper } from '../components/layout/layoutWrapper';
import { Divider } from '../components/ui/list/components/divider/Divider';
import { ListTile } from '../components/ui/list/components/listTile/ListTile';
import { BASE_URL } from '../config/env';

const Settings: NextPage = () => {
	async function onClick() {
		await axios({
			method: 'get',
			url: `${BASE_URL}/api/serverData`,
		});
	}
	return (
		<LayoutWrapper showAppbar={true} showAppbarIcon={false} appBarTitle="Settings">
			<div className="flex flex-col">
				<ListTile title="Open Admin Panel" onClick={() => router.push('/admin/adminPanel')} />
				<Divider />
			</div>
		</LayoutWrapper>
	);
};

export default Settings;
