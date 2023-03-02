import axios from 'axios';
import logger from 'tw-logger';
import color from '../interfaces/color';
import { ShellyDevice } from '../interfaces/shellyDevice';

export class RGBW2 implements ShellyDevice {
  id: string;
  ipAddress: string;
  state: boolean = false;
  color: color = { red: 0, green: 0, blue: 0 };
  brightness: number = 0;
  name: string = '';
  hostname?: string;
  offColor: color = { red: 0, green: 0, blue: 0 };
  isConnected: boolean = false;
  power: number = 0;

  constructor(ipAddress: string, id: string) {
    this.ipAddress = ipAddress;
    this.id = id;
  }

  public async getSettings(): Promise<any> {
    try {
      const res = await axios.get(`http://${this.ipAddress}/settings`);

      return res.data;
    } catch (error) {
      logger.error(error.message);
    }
  }

  public async getStatus(): Promise<any> {
    try {
      const res = await axios.get(`http://${this.ipAddress}/status`);

      return res.data;
    } catch (error) {
      logger.error(error.message);
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

  public async getPower() {
    return this.power;
  }

  public getDevice() {
    return this;
  }

  public async fetchCurrentDeviceData() {
    try {
      let res = await this.getSettings();

      this.hostname = res.device.hostname;

      this.state = res.lights[0].ison;

      this.name = res.name;

      let color = {
        red: res.lights[0].red,
        green: res.lights[0].green,
        blue: res.lights[0].blue,
      };

      this.color = color;

      this.brightness = res.lights[0].gain;

      res = await this.getStatus();
      this.power = res.meters[0].power;

      return {
        hostname: this.hostname,
        state: this.state,
        name: this.name,
        color: this.color,
        brightness: this.brightness,
        power: this.power,
      };
    } catch (error) {
      logger.error(error.message);
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
      logger.error(error.message);
    }
  }

  public async setBrightness(brightness: number): Promise<void> {
    try {
      await axios.get(`http://${this.ipAddress}/color/0?gain=${brightness}`);
      return;
    } catch (error) {
      logger.error(error.message);
    }
  }

  public async turnOff(): Promise<void> {
    try {
      await axios.get(`http://${this.ipAddress}/color/0?turn=off`);
    } catch (error) {
      logger.error(error.message);
    }
  }

  public async turnOn(): Promise<void> {
    try {
      await axios.get(`http://${this.ipAddress}/color/0?turn=on`);
    } catch (error) {
      logger.error(error.message);
    }
  }
}
