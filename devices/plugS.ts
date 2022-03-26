import axios from 'axios';

export class PlugS {
	ipAddress: string;
	state: boolean = false;
	name: string = '';
	hostname?: string;
	isConnected: boolean = false;

	constructor(ipAddress: string) {
		this.ipAddress = ipAddress;
	}

	public initialize() {
		this.setDeviceData();
	}

	public async getSettings(): Promise<any> {
		try {
			const res = await axios.get(`http://${this.ipAddress}/settings`);

			return res.data;
		} catch (error) {
			console.error(error);
		}
	}

	private async setDeviceData() {
		try {
			const res = await this.getSettings();

			if (this.hostname !== res.device.hostname) {
				this.hostname = res.device.hostname;
			}

			if (this.state !== res.relays[0].ison) {
				this.state = res.relays[0].ison;
			}

			if (this.name !== res.name) {
				this.name = res.name;
			}
		} catch (error) {
			console.error(error);
		}
	}

	public async toggleDevice(): Promise<void> {
		try {
			if (this.state) {
				await axios.get(`http://${this.ipAddress}/relay/0?turn=off`);
			} else {
				await axios.get(`http://${this.ipAddress}/relay/0?turn=on`);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
