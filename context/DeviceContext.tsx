import {
	createContext,
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react';
import rgbw2Devices from '../data/rgbw2.json';
import plugSDevices from '../data/plugS.json';
// import groups from '../data/groups.json';
import { RGBW2Type } from '../types/RGBW2Type';
import { PlugSType } from '../types/PlugSTypes';
import axios from 'axios';

interface Group {
	itemID: string[];
}

type Device = RGBW2Type | PlugSType;

interface DeviceContextType {
	devices: Device[];
	setDevices: Dispatch<SetStateAction<Device[]>>;
}

const DeviceContext = createContext<DeviceContextType>(undefined!);

export function useDevices() {
	return useContext(DeviceContext);
}

export const DeviceProvider: FC = (props) => {
	const [devices, setDevices] = useState<Device[]>([]);

	const fetchData = async () => {
		const rgbw2 = await axios({ method: 'get', url: 'http://localhost:3000/api/rgbw2' });
		const plugS = await axios({ method: 'get', url: 'http://localhost:3000/api/plugS' });
		setDevices([
			...rgbw2.data.map((x: any) => ({ type: 'rgbw2', ...x })),
			...plugS.data.map((x: any) => ({ type: 'plugS', ...x })),
		]);
	};
	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		//saveJSON
	}, [devices]);

	const contextValue: DeviceContextType = { devices, setDevices };

	return (
		<>
			<DeviceContext.Provider value={contextValue}>{props.children}</DeviceContext.Provider>
		</>
	);
};
