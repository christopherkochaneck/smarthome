import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { LayoutWrapper } from '../../components/layout/layoutWrapper';
import { Usage } from '../../components/ui/usage/Usage';
import { BASE_URL } from '../../config/env';
import { redirectByPermission } from '../../util/redirect';
import { AdminPanelCard } from './components/adminPanelCard';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);

	const state = redirectByPermission(session);
	if (state) return state;

	return { props: {} };
};

export const AdminPanel: NextPage = () => {
	const [freeMemory, setFreeMemory] = useState<number>(0);
	const [totalMemory, setTotalMemory] = useState<number>(0);
	const [architecture, setArchitecture] = useState<string>('');
	const [hostName, setHostName] = useState<string>('');
	const [platform, setPlatform] = useState<string>('');
	const [uptime, setUptime] = useState<number>(0);

	useEffect(() => {
		const interval = setInterval(async () => {
			const response = await axios({
				method: 'get',
				url: `${BASE_URL}/api/serverData`,
			});

			const { freeMemory, totalMemory, architecture, hostName, platform, upTime } = response.data;
			setFreeMemory(freeMemory);
			setTotalMemory(totalMemory);
			setArchitecture(architecture);
			setHostName(hostName);
			setPlatform(platform);
			setUptime(upTime);
		}, 400);

		return () => {
			clearInterval(interval);
		};
	}, []);
	return (
		<>
			<LayoutWrapper showAppbar showBackButton appBarTitle="Admin Panel">
				<div className="p-4">
					<div className="h-max w-full grid grid-cols-2 gap-4">
						<div style={{ gridArea: '1/1/2/3' }}>
							<Usage
								title="RAM Usage"
								currentValue={(totalMemory - freeMemory) / (1024 * 1024 * 1024)}
								maxValue={totalMemory / (1024 * 1024 * 1024)}
								unit="GB"
							/>
						</div>
						<AdminPanelCard title="System Architecture" value={architecture} />
						<AdminPanelCard title="Hostname" value={hostName} />
						<AdminPanelCard title="Hostname" value={hostName} />
						<AdminPanelCard title="Platform" value={platform} />
						<AdminPanelCard title="Uptime" value={`${(uptime / 86400).toFixed(0)} Days`} />
					</div>
				</div>
			</LayoutWrapper>
		</>
	);
};

export default AdminPanel;
