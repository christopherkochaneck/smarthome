import { PowerLogEntry } from './../../types/powerLogEntry';
import { RGBW2 } from './../../../client/devices/rgbw2';
import { PlugS } from './../../../client/devices/plugS';
import * as fs from 'fs';
import * as path from 'path';
import express from 'express';
import { RGBW2Type } from '../../../client/types/RGBW2Type';
import { PlugSType } from '../../../client/types/PlugSType';
const router = express.Router();

const dirName = path.join(process.cwd(), 'data');
const fileName = path.join(process.cwd(), 'data', 'powerLog.json');

async function logPower() {
  const rgbw2 = fs.readFileSync(`${process.cwd()}/data/rgbw2.json`).toString();

  const rgbw2Object: any[] = JSON.parse(rgbw2);

  const promisesRGBW2 = rgbw2Object.map(async (device: RGBW2Type) => {
    let entity = new RGBW2(device.ipAdress, device.id);
    await entity.fetchCurrentDeviceData();
    return entity.power;
  });

  const plugS = fs.readFileSync(`${process.cwd()}/data/plugS.json`).toString();

  const plugSObject: any[] = JSON.parse(plugS);

  const promisesPlugS = plugSObject.map(async (device: PlugSType) => {
    let entity = new PlugS(device.ipAdress, device.id);
    await entity.fetchCurrentDeviceData();
    return entity.power;
  });

  const numbers = await Promise.all([...promisesRGBW2, ...promisesPlugS]);

  const power = numbers.reduce((prev, current) => prev + current, 0);

  const data = fs.readFileSync(fileName).toString();
  const object = JSON.parse(data);

  const timeOffset = Math.abs(new Date().getTimezoneOffset()) * 60000;
  const currentTimeStamp = new Date().getTime();
  const currentDate = new Date(currentTimeStamp + timeOffset);

  object.push({
    date: currentDate.toISOString(),
    power: power.toFixed(2),
  });

  const appendedJson = JSON.stringify(object);

  fs.writeFileSync(fileName, appendedJson);
}

function createFileIfNotExists() {
  if (!fs.existsSync(dirName)) {
    try {
      fs.mkdirSync(dirName);
    } catch (err) {
      console.log(err);
    }
  }

  if (!fs.existsSync(fileName)) {
    try {
      fs.writeFileSync(fileName, '[]');
    } catch (err) {
      console.log(err);
    }
  }

  if (!fs.existsSync(fileName)) {
    try {
      fs.writeFileSync(fileName, '[]');
    } catch (err) {
      console.log(err);
    }
  }
}

setInterval(async () => {
  await logPower();
}, 300000);
createFileIfNotExists();

router.get('/', async (req, res) => {
  try {
    const data = fs.readFileSync(fileName).toString();

    logPower();
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.delete('/', async (req, res) => {
  try {
    const data = fs.readFileSync(fileName).toString();
    let object: any[] = JSON.parse(data);
    let itemsToFilterOut: any[] = [];

    const days = req.query.days;

    if (typeof days !== 'string') {
      return res.sendStatus(500);
    }

    object.forEach((powerLogEntry: PowerLogEntry) => {
      const dateOfPowerLogEntry = new Date(powerLogEntry.date);

      const reqDaysInMillis = parseInt(days) * 24 * 60 * 60 * 1000;

      const timeOffset = Math.abs(new Date().getTimezoneOffset()) * 60000;
      const currentTimeStamp = new Date().getTime();
      const currentDate = new Date(currentTimeStamp + timeOffset);

      const timeStampXDaysAgo = new Date(
        currentDate.getTime() - reqDaysInMillis
      ).getTime();

      if (timeStampXDaysAgo > dateOfPowerLogEntry.getTime()) {
        itemsToFilterOut.push(powerLogEntry);
      }
    });

    object = object.filter((item) => !itemsToFilterOut.includes(item));

    const stringifiedObject = JSON.stringify(object);
    fs.writeFileSync(fileName, stringifiedObject);
    return res.status(200).send(stringifiedObject);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

export default router;
