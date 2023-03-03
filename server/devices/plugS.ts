import axios from 'axios';
import logger from 'tw-logger';
import { ShellyDevice } from '../interfaces/shellyDevice';

export class PlugS implements ShellyDevice {
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
      const res = await axios({
        method: 'GET',
        url: `http://${this.ipAddress}/settings`,
      });

      return res.data;
    } catch (error) {
      logger.error(error.message);
    }
  }

  public async getMeters(): Promise<any> {
    try {
      const res = await axios({
        method: 'GET',
        url: `http://${this.ipAddress}/meter/0`,
      });

      return res.data;
    } catch (error) {
      logger.error(error.message);
    }
  }

  public async fetchCurrentDeviceData() {
    try {
      const res = await this.getSettings();

      const meters = await this.getMeters();

      this.hostname = res.device.hostname;

      this.state = res.relays[0].ison;

      this.name = res.relays[0].name;
      this.power = meters.power;

      return {
        hostname: this.hostname,
        state: this.state,
        name: this.name,
        power: this.power,
      };
    } catch (error) {
      logger.error(error.message);
    }
  }

  public async turnOff(): Promise<void> {
    try {
      await axios({
        method: 'GET',
        url: `http://${this.ipAddress}/relay/0?turn=off`,
      });
    } catch (error) {
      logger.error(error.message);
    }
  }

  public async turnOn(): Promise<void> {
    try {
      await axios({
        method: 'GET',
        url: `http://${this.ipAddress}/relay/0?turn=on`,
      });
    } catch (error) {
      logger.error(error.message);
    }
  }
}
