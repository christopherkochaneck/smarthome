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

	constructor(ipAddress: string) {
		this.ipAddress = ipAddress;
	}

	public initialize() {
		this.setDeviceData();
	}

	public async getStatus(): Promise<any> {
		try {
			const res = await axios.get(`http://${this.ipAddress}/status`);

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
			this.hostname = res.device.hostname;
			this.state = res.lights[0].ison;
			this.name = res.name;
			this.color = { red: res.lights[0].red, green: res.lights[0].green, blue: res.lights[0].blue };
			this.brightness = res.lights[0].gain;
		} catch (error) {
			console.error(error);
		}
	}

	public async setColor(color: color): Promise<void> {
		try {
			await axios.get(`http://${this.ipAddress}/settings/color/0?color=${color}`);
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
