import axios from 'axios';
import color from '../interfaces/color';

export class RGBW2 {
	id: string;
	ipAddress: string;
	state: boolean = false;
	color: color = { red: 0, green: 0, blue: 0 };
	brightness: number = 0;
	name: string = '';
	hostname?: string;
	offColor: color = { red: 0, green: 0, blue: 0 };
	isConnected: boolean = false;

	constructor(ipAddress: string, id: string) {
		this.ipAddress = ipAddress;
		this.id = id;
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

	public async getName() {
		return this.name;
	}

	public getDevice() {
		return this;
	}

	public async fetchCurrentDeviceData() {
		try {
			const res = await this.getSettings();

			this.hostname = res.device.hostname;

			this.state = res.lights[0].ison;

			this.name = res.name;

			let color = { red: res.lights[0].red, green: res.lights[0].green, blue: res.lights[0].blue };

			this.color = color;

			this.brightness = res.lights[0].gain;
		} catch (error) {
			console.error(error);
		}
	}

	public async setColor(color: color | undefined): Promise<void> {
		try {
			if (color === undefined) {
				return;
			}
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
