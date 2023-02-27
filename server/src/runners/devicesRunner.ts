import logger from 'tw-logger';
import color from '../../../client/interfaces/color';
import { RGBW2 as RGBW2Model } from '../../models/rgbw2';
import { socketServer } from '../startup/socketServer';
import { RGBW2 } from './../../../client/devices/rgbw2';

export const dataServiceRunner = () => {
  const devicedata: any[] = [];
  let i = 0;
  try {
    setInterval(async () => {
      const devices = await RGBW2Model.find();
      devices.forEach(async ({ _id, ipAdress }) => {
        const id = _id.toString();
        const d = new RGBW2(ipAdress!, id);
        const res = await d.fetchCurrentDeviceData();
        if (res === undefined) return;
        const foundDeviceIndex = devicedata.findIndex(
          (x) => x.hostname === res.hostname
        );
        if (foundDeviceIndex === -1) return devicedata.push(res);
        if (
          JSON.stringify(devicedata[foundDeviceIndex]) === JSON.stringify(res)
        )
          return;

        // mullitple req, because power and state dont change sychronously
        devicedata[foundDeviceIndex] = res;
        socketServer.emit(id, res);
      });
    }, 1000);
  } catch (error: any) {
    console.log(error.message);
  }
};
