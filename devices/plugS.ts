import axios from 'axios';

export class PlugS {
	id: string;
	ipAddress: string;
	state: boolean = false;
	name: string = '';
	hostname?: string;
	isConnected: boolean = false;
	power: number = 0;

	constructor(ipAddress: string, id: string) {
		this.ipAddress = ipAddress;
		this.id = id;
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

	public async getMeters(): Promise<any> {
		try {
			const res = await axios.get(`http://${this.ipAddress}/meter/0`);

			return res.data;
		} catch (error) {
			console.log(error);
		}
	}

	private async setDeviceData() {
		try {
			const res = await this.getSettings();

			const res1 = await this.getMeters();

			if (this.hostname !== res.device.hostname) {
				this.hostname = res.device.hostname;
			}

			if (this.state !== res.relays[0].ison) {
				this.state = res.relays[0].ison;
			}

			if (this.name !== res.name) {
				this.name = res.name;
			}

			if (this.power !== res1.power) {
				this.power === res1.power;
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
