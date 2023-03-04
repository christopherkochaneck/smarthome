import { SOCKET_PORT } from './../../config/env';
import { Server } from 'socket.io';
import { PlugS } from '../../../client/devices/plugs';
import { RGBW2 } from '../../../client/devices/rgbw2';
import { HT } from '../../../client/devices/ht';
import { Device } from '../../models/device';
import logger from 'tw-logger';

export const socketServer = new Server(3002, {
  cors: { origin: '*' },
  allowEIO3: true,
});

let i = 0;
// socketServer middleware
socketServer.use(async (socket, next) => {
  console.log('here', i);
  const id = socket.handshake.query.id?.toString();
  if (id) {
    const deviceData = await getInitialData(id);
    if (!deviceData) return;
    deviceData && socket.emit(id, deviceData);
  }
  i += 1;
  next();
});

async function getInitialData(id: string) {
  try {
    const device = await Device.findOne({ _id: id });
    if (!device || !device.ipAdress || !device.type) return;

    const deviceInstance = {
      rgbw2: new RGBW2(device.ipAdress, device._id.toString()),
      plugs: new PlugS(device.ipAdress, device._id.toString()),
      ht: new HT(device.ipAdress, device._id.toString()),
    }[device.type];

    if (!deviceInstance) return;

    const res = await deviceInstance.fetchCurrentDeviceData();
    if (!res) return;

    return res;
  } catch (error: any) {
    logger.error(error.message);
  }
}
