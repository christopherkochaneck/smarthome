import axios from 'axios';
import color from '../interfaces/color';

export class RGBW2 {
	ipAddress: string;
	state: boolean = false;
	color: color = { red: 0, green: 0, blue: 0 };
	name: string = '';
	hostname?: string;

	constructor(ipAddress: string) {
		this.ipAddress = ipAddress;
	}

	public initialize() {
		this.setDeviceData();
	}

	public async getStatus(): Promise<any> {
		try {
			const res = await axios.get(`http://${this.ipAddress}/status`);
			if (res.data.meters[0].power < 0.5) {
				this.state = false;
			} else {
				this.state = true;
			}

			return res.data;
		} catch (error) {
			console.error(error);
		}
	}

	public async getSettings(): Promise<any> {
		try {
			const res = await axios.get(`http://${this.ipAddress}/settings`);

			return res.data;
		} catch (error) {
			console.error(error);
		}
	}

	public async getColor(): Promise<color> {
		try {
			const res = await axios.get(`http://${this.ipAddress}/color/0`);

			this.color = { red: res.data.red, green: res.data.green, blue: res.data.blue };

			return this.color;
		} catch (error) {
			console.error(error);
			return { red: 0, green: 0, blue: 0 };
		}
	}

	public setState(state: boolean) {
		this.state = state;
	}

	public async getState(): Promise<boolean> {
		try {
			const res = await axios.get(`http://${this.ipAddress}/color/0`);
			this.setState(res.data.ison);

			return this.state;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	private async setDeviceData() {
		try {
			const res = await this.getSettings();
			this.hostname = res.device.hostname;
			this.name = res.name;
		} catch (error) {
			console.error(error);
		}
	}

	public async setBrightness(brightness: number): Promise<void> {
		try {
			await axios.get(`http://${this.ipAddress}/settings/color/0?gain=${brightness}`);
			return;
		} catch (error) {
			console.error(error);
		}
	}

	public async toggleDevice(): Promise<void> {
		try {
			await this.getStatus();
			if (this.state) {
				await axios.get(`http://${this.ipAddress}/color/0?turn=off`);
			} else {
				await axios.get(`http://${this.ipAddress}/color/0?turn=on`);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
