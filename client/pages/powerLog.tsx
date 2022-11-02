import { GetServerSideProps, NextPage } from 'next';
import { Select } from '../components/ui/select/select';
import { LayoutWrapper } from '../components/layout/layoutWrapper';
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config/env';
import { PowerLogEntry } from '../../server/types/powerLogEntry';

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import * as moment from 'moment';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
	powerData: PowerLogEntry[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	const powerData: PowerLogEntry[] = await axios({
		method: 'get',
		url: `${BASE_URL}/api/powerLog`,
	}).then((data) => data.data);

	return { props: { powerData } };
};

export const PowerLog: NextPage<Props> = ({ powerData }) => {
	const dates: any[] = [];
	const [daysToDelete, setDaysToDelete] = useState<string>('1');

	function onFormSubmit() {
		axios({ method: 'delete', url: `${BASE_URL}/api/powerLog/?days=${daysToDelete}` });
	}

	function getPowerUsageforDay(date: string) {
		let powerUsedOnDay: number = 0;
		let entriesOfDay = 0;
		powerData.forEach((powerLogEntry) => {
			const currentDate = new Date(powerLogEntry.date);
			const dateToCompare = new Date(date);

			if (currentDate.getDate() == dateToCompare.getDate()) {
				if (currentDate.getMonth() == dateToCompare.getMonth()) {
					if (currentDate.getFullYear() == dateToCompare.getFullYear()) {
						powerUsedOnDay += parseInt(powerLogEntry.power);
						entriesOfDay += 1;
					}
				}
			}
		});
		return powerUsedOnDay / entriesOfDay / 12 / 1000;
	}

	function getChartData() {
		const currentDate = new Date(moment.now());
		const pastDates: Date[] = [];

		for (let i = 0; i < 6; i++) {
			const dayXAgo = currentDate.getTime() - i * 24 * 60 * 60 * 1000;
			pastDates.push(new Date(dayXAgo));
		}

		const labels: string[] = [];

		pastDates.forEach((date) => {
			const UIDate = `${date.getDate()}.${date.getMonth()}.${date
				.getFullYear()
				.toString()
				.substring(2, 4)}`;
			labels.push(UIDate);
			dates.push({ UIdate: UIDate, realDate: date });
		});

		const data = {
			labels,
			datasets: [
				{
					label: 'Average Power Usage (in kWh)',
					data: dates.map((date) => getPowerUsageforDay(date.realDate)),
					backgroundColor: 'rgba(68, 68, 68,1)',
				},
			],
		};

		return data;
	}

	return (
		<LayoutWrapper showAppbar showAppbarIcon showBackButton appBarTitle="Power Log">
			<div className="p-4 flex flex-col gap-6">
				<Bar data={getChartData()} />
				<form onSubmit={onFormSubmit} className="flex flex-col items-center gap-5">
					<span className="text-white flex flex-row gap-2 items-center">
						Delete Data older than
						<Select
							values={['1', '5', '7', '10', '30']}
							className="h-10 rounded-xl"
							onChange={(e) => {
								setDaysToDelete(e.currentTarget.value);
							}}
							value={daysToDelete}
						/>
						days.
					</span>
					<button type="submit" className="bg-red-700 rounded-2xl p-2 text-white">
						Delete
					</button>
				</form>
			</div>
		</LayoutWrapper>
	);
};

export default PowerLog;
