const wol = require('wol');

export class WOL {
	mac: string;

	constructor(mac: string) {
		this.mac = mac;
	}

	async turnOn() {
		wol.wake(this.mac);
	}

	async turnOff() {}
}
