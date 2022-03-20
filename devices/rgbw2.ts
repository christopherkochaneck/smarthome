import axios from 'axios';

interface Color {
	red: number;
	green: number;
	blue: number;
}

export class RGBW2 {
	ipAddress: string;
	state: Boolean = false;
	color?: Color;
	hostname?: string;

	constructor(ipAddress: string) {
		this.ipAddress = ipAddress;
		this.setDeviceData();
	}

	async getStatus() {
		try {
			const res = await axios.get(`http://${this.ipAddress}/status`);
			if (res.data.meters[0].power < 0.5) {
				this.state = false;
			} else {
				this.state = true;
			}

			return res.data;
		} catch (error) {
			console.log(error);
		}
	}

	async getSettings() {
		try {
			const res = await axios.get(`http://${this.ipAddress}/settings`);

			return res.data;
		} catch (error) {
			console.log(error);
		}
	}

	async getColor() {
		try {
			const res = await axios.get(`http://${this.ipAddress}/color/0`);

			this.color = { red: res.data.red, green: res.data.green, blue: res.data.blue };

			return this.color;
		} catch (error) {
			console.log(error);
		}
	}

	async getName() {
		try {
			const res = await axios.get(`http://${this.ipAddress}/settings`);

			return res.data.name;
		} catch (error) {
			console.log(error);
		}
	}

	setState(state: Boolean) {
		this.state = state;
	}

	async getState() {
		try {
			const res = await axios.get(`http://${this.ipAddress}/color/0`);
			this.setState(res.data.ison);

			return this.state;
		} catch (error) {
			console.log(error);
		}
	}

	async setDeviceData() {
		try {
			const res = await this.getSettings();
			this.hostname = res.device.hostname;
		} catch (error) {
			console.log(error);
		}
	}

	async setBrightness(brightness: number) {
		try {
			await axios.get(`http://${this.ipAddress}/settings/color/0?gain=${brightness}`);
			return;
		} catch (error) {
			console.log(error);
		}
	}

	async toggleDevice() {
		try {
			await this.getStatus();
			if (this.state) {
				await axios.get(`http://${this.ipAddress}/color/0?turn=off`);
			} else {
				await axios.get(`http://${this.ipAddress}/color/0?turn=on`);
			}
		} catch (error) {
			console.log(error);
		}
	}
}
