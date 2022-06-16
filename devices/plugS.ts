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

	public async getSettings(): Promise<any> {
		try {
			const res = await axios({ method: 'GET', url: `http://${this.ipAddress}/settings` });

			return res.data;
		} catch (error) {
			console.error(error);
		}
	}

	public async getMeters(): Promise<any> {
		try {
			const res = await axios({ method: 'GET', url: `http://${this.ipAddress}/meter/0` });

			return res.data;
		} catch (error) {
			console.log(error);
		}
	}

	public async fetchCurrentDeviceData() {
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

	public async turnOff(): Promise<void> {
		try {
			await axios({ method: 'GET', url: `http://${this.ipAddress}/relay/0?turn=off` });
		} catch (error) {
			console.error(error);
		}
	}

	public async turnOn(): Promise<void> {
		try {
			await axios({ method: 'GET', url: `http://${this.ipAddress}/relay/0?turn=on` });
		} catch (error) {
			console.error(error);
		}
	}
}
