import axios from 'axios';
import color from '../interfaces/color';

export class RGBW2 {
	ipAddress: string;
	state: boolean = false;
	color: color = { red: 0, green: 0, blue: 0 };
	brightness: number = 0;
	name: string = '';
	hostname?: string;
	offColor: color = { red: 0, green: 0, blue: 0 };
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

	public async getColor() {
		return this.color;
	}

	public async getBrightness() {
		return this.brightness;
	}

	public async getState() {
		return this.state;
	}

	public getDevice() {
		return this;
	}

	private async setDeviceData() {
		try {
			const res = await this.getSettings();

			if (this.hostname !== res.device.hostname) {
				this.hostname = res.device.hostname;
			}

			if (this.state !== res.lights[0].ison) {
				this.state = res.lights[0].ison;
			}

			if (this.name !== res.name) {
				this.name = res.name;
			}

			let color = { red: res.lights[0].red, green: res.lights[0].green, blue: res.lights[0].blue };

			if (this.color !== color) {
				this.color = color;
			}

			if (this.brightness !== res.lights[0].gain) {
				this.brightness = res.lights[0].gain;
			}
		} catch (error) {
			console.error(error);
		}
	}

	public async setColor(color: color): Promise<void> {
		try {
			await axios.get(
				`http://${this.ipAddress}/color/0?red=${color.red}&green=${color.green}&blue=${color.blue}`
			);
		} catch (error) {
			console.error(error);
		}
	}

	public async setBrightness(brightness: number): Promise<void> {
		try {
			await axios.get(`http://${this.ipAddress}/color/0?gain=${brightness}`);
			return;
		} catch (error) {
			console.error(error);
		}
	}

	public async toggleDevice(): Promise<void> {
		try {
			if (this.state) {
				await axios.get(`http://${this.ipAddress}/color/0?turn=off`);
			} else {
				await axios.get(`http://${this.ipAddress}/color/0?turn=on`);
			}
		} catch (error) {
			console.error(error);
		}
	}

	public async turnOff(): Promise<void> {
		try {
			await axios.get(`http://${this.ipAddress}/color/0?turn=off`);
		} catch (error) {
			console.error(error);
		}
	}

	public async turnOn(): Promise<void> {
		try {
			await axios.get(`http://${this.ipAddress}/color/0?turn=on`);
		} catch (error) {
			console.error(error);
		}
	}
}
