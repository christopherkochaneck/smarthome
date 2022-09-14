import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { LayoutWrapper } from '../../components/layout/layoutWrapper';
import { Card } from '../../components/ui/card/card';
import { Usage } from '../../components/ui/usage/Usage';
import { BASE_URL } from '../../config/env';

export const AdminPanel: FC = () => {
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
			setFreeMemory(response.data.freeMemory);
			setTotalMemory(response.data.totalMemory);
			setArchitecture(response.data.architecture);
			setHostName(response.data.hostName);
			setPlatform(response.data.platform);
			setUptime(response.data.upTime);
		}, 400);

		return () => {
			clearInterval(interval);
		};
	}, []);
	return (
		<>
			<LayoutWrapper showAppbar={true} showAppbarIcon={false} appBarTitle="Admin Panel">
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
						<Card className="flex flex-col p-4 gap-y-4">
							<div>System Architecture</div>
							<Card className="border border-black">{architecture}</Card>
						</Card>
						<Card className="flex flex-col p-4 gap-y-4">
							<div>Hostname</div>
							<Card className="border border-black">{hostName}</Card>
						</Card>
						<Card className="flex flex-col p-4 gap-y-4">
							<div>Platform</div>
							<Card className="border border-black">{platform}</Card>
						</Card>
						<Card className="flex flex-col p-4 gap-y-4">
							<div>Uptime</div>
							<Card className="border border-black">{(uptime / 86400).toFixed(0)} Days</Card>
						</Card>
					</div>
				</div>
			</LayoutWrapper>
		</>
	);
};

export default AdminPanel;
