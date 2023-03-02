import { Device as DeviceModel } from '../../models/device';
import { socketServer } from '../startup/socketServer';
import { RGBW2 } from './../../../client/devices/rgbw2';
import { PlugS } from './../../../client/devices/plugs';
import { HT } from '../../models/ht';

export const dataServiceRunner = () => {
  const devicedata: any[] = [];
  try {
    setInterval(async () => {
      const devices = await DeviceModel.find();

      for (const device of devices) {
        const { _id, ipAdress, type } = device;
        const id = _id.toString();

        let deviceInstance;

        if (!ipAdress) return;
        switch (type) {
          case 'rgbw2':
            deviceInstance = new RGBW2(ipAdress, id);
            break;
          case 'plugs':
            deviceInstance = new PlugS(ipAdress, id);
            break;
          case 'ht':
            deviceInstance = new HT(ipAdress, id);
          default:
            continue;
        }

        const res = await deviceInstance.fetchCurrentDeviceData();

        if (res === undefined) {
          continue;
        }

        const foundDeviceIndex = devicedata.findIndex(
          (x) => x.hostname === res.hostname
        );

        if (foundDeviceIndex === -1) {
          devicedata.push(res);
        } else if (
          JSON.stringify(devicedata[foundDeviceIndex]) !== JSON.stringify(res)
        ) {
          devicedata[foundDeviceIndex] = res;
          socketServer.emit(id, res);
        }
      }
    }, 1000);
  } catch (error: any) {}
};
