import axios from 'axios';

export class HT {
  id: string;
  ipAddress: string;
  tempThreshold: number = 0;
  temperature: number = 0;
  temperatureUnit: string = '';
  humidity: number = 0;

  constructor(ipAddress: string, id: string) {
    this.ipAddress = ipAddress;
    this.id = id;
  }

  public async getSettings(): Promise<any> {
    const res = await axios({
      method: 'GET',
      url: `http://${this.ipAddress}/settings`,
    });

    return res.data;
  }

  public async getStatus(): Promise<any> {
    try {
      const res = await axios({
        method: 'GET',
        url: `http://${this.ipAddress}/status`,
      });

      return res.data;
    } catch (error) {}
  }

  public async fetchCurrentDeviceData() {
    try {
      const res = await this.getStatus();

      if (res === undefined) {
        return;
      }

      this.temperature = res.tmp.value;
      this.temperatureUnit = res.tmp.units;
      this.humidity = res.hum.value;
    } catch (error) {
      console.error(error);
    }
  }
}
