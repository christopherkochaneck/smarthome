import request from 'supertest';
import {
  afterEach,
  beforeEach,
  describe,
  it,
  expect,
  afterAll,
  beforeAll,
} from '@jest/globals';
import { RGBW2 } from '../../models/RGBW2';

let server;
describe('/api/rgbw2', () => {
  beforeAll(() => {
    server = require('../../src/app');
  });
  afterEach(async () => {
    await RGBW2.deleteMany({});
  });
  afterAll(async () => {
    await server.close();
  });

  describe('GET /', () => {
    it('should return all rgbw2 Devices', async () => {
      const rgbw2 = [
        { ipAdress: '192.168.1.1', title: 'MyTitle', type: 'rgbw2' },
        { ipAdress: '192.168.1.2', title: 'MyTitle2', type: 'rgbw2' },
        { ipAdress: '192.168.1.3', title: 'MyTitle3', type: 'rgbw2' },
      ];
      await RGBW2.collection.insertMany(rgbw2);

      const res = await request(server).get('/api/rgbw2');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(3);
      expect(res.body.some((x) => x.title === 'MyTitle')).toBeTruthy();
      expect(res.body.some((x) => x.title === 'MyTitle2')).toBeTruthy();
      expect(res.body.some((x) => x.title === 'MyTitle3')).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    it('should return a RGBW2 device if given a valid id', async () => {
      const rgbw2 = {
        ipAdress: '192.168.1.1',
        title: 'MyTitle',
        type: 'rgbw2',
      };
      const insertedDevice = await RGBW2.collection.insertOne(rgbw2);
      const res = await request(server).get(
        `/api/rgbw2/${insertedDevice.insertedId}`
      );

      expect(res.body).toStrictEqual({
        _id: insertedDevice.insertedId.toString(),
        ipAdress: '192.168.1.1',
        title: 'MyTitle',
        type: 'rgbw2',
      });
    });

    it("should return a 404 if the device with given id couldn't be found", async () => {
      const rgbw2 = {
        ipAdress: '192.168.1.1',
        title: 'MyTitle',
        type: 'rgbw2',
      };
      RGBW2.collection.insertOne(rgbw2);
      const res = await request(server).get(
        '/api/rgbw2/5eb78994dbb89024f04a2507'
      );
      expect(res.statusCode).toBe(404);
    });

    it('should return a 500 if the id is invalid', async () => {
      const rgbw2 = {
        ipAdress: '192.168.1.1',
        title: 'MyTitle',
        type: 'rgbw2',
      };
      RGBW2.collection.insertOne(rgbw2);
      const res = await request(server).get('/api/rgbw2/123');
      expect(res.statusCode).toBe(500);
    });
  });

  describe('POST /', () => {
    it('should return a RGBW2 Object when sending a POST Request', async () => {
      const rgbw2 = {
        ipAdress: '192.168.1.1',
        title: 'MyTitle',
        type: 'rgbw2',
      };
      const res = await request(server).post('/api/rgbw2').send(rgbw2);
      let plugSObject = RGBW2.find({
        _id: res.body._id,
        ipAdress: rgbw2.ipAdress,
        title: rgbw2.title,
        type: rgbw2.type,
      });
      expect(plugSObject).not.toBe(null);
      expect(res.body).toEqual({
        __v: 0,
        _id: res.body._id,
        ipAdress: rgbw2.ipAdress,
        title: rgbw2.title,
        type: rgbw2.type,
      });
    });
  });

  describe('PATCH /:id', () => {
    it('should return an updated rgbw2 Object when passed valid Data', async () => {
      const rgbw2 = {
        ipAdress: '192.168.1.1',
        title: 'MyTitle',
        type: 'rgbw2',
      };
      const insertedDevice = await RGBW2.collection.insertOne(rgbw2);
      const id = insertedDevice.insertedId.toString();
      const updatedPlugS = {
        _id: id,
        ipAdress: '192.168.1.1',
        title: 'MyUpdatedTitle',
        type: 'rgbw2',
      };
      const res = await request(server)
        .patch(`/api/rgbw2/${id}`)
        .send(updatedPlugS);

      expect(res).not.toBe(null);
      expect(res.body).toEqual(updatedPlugS);
    });

    it("should return a 404 if the device with given id couldn't be found", async () => {
      const rgbw2 = {
        ipAdress: '192.168.1.1',
        title: 'MyTitle',
        type: 'rgbw2',
      };
      const insertedDevice = await RGBW2.collection.insertOne(rgbw2);
      const id = insertedDevice.insertedId.toString();
      const updatedPlugS = {
        _id: id,
        ipAdress: '192.168.1.1',
        title: 'MyUpdatedTitle',
        type: 'rgbw2',
      };
      const res = await request(server)
        .patch('/api/rgbw2/5eb78994dbb89024f04a2507')
        .send(updatedPlugS);
      expect(res.statusCode).toBe(404);
    });

    it('should return a 500 if the id is invalid', async () => {
      const rgbw2 = {
        ipAdress: '192.168.1.1',
        title: 'MyTitle',
        type: 'rgbw2',
      };
      RGBW2.collection.insertOne(rgbw2);
      const res = await request(server).patch('/api/rgbw2/123');
      expect(res.statusCode).toBe(500);
    });
  });

  describe('DELETE /:id', () => {
    it('should delete a RGBW2 Entry and return the deleted entry when given a valid ID that is used in the DB', async () => {
      const rgbw2 = {
        ipAdress: '192.168.1.1',
        title: 'MyTitle',
        type: 'rgbw2',
      };
      const insertedDevice = await RGBW2.collection.insertOne(rgbw2);
      const id = insertedDevice.insertedId.toString();
      const res = await request(server).delete(`/api/rgbw2/${id}`);
      const foundPlugS = await RGBW2.findById(id);
      expect(foundPlugS).toBe(null);
    });

    it("should return a 404 if the device with given id couldn't be found", async () => {
      const rgbw2 = {
        ipAdress: '192.168.1.1',
        title: 'MyTitle',
        type: 'rgbw2',
      };
      const insertedDevice = await RGBW2.collection.insertOne(rgbw2);
      const id = insertedDevice.insertedId.toString();
      const res = await request(server).delete(
        '/api/rgbw2/5eb78994dbb89024f04a2507'
      );
      expect(res.statusCode).toBe(404);
    });

    it('should return a 500 if the id is invalid', async () => {
      const rgbw2 = {
        ipAdress: '192.168.1.1',
        title: 'MyTitle',
        type: 'rgbw2',
      };
      RGBW2.collection.insertOne(rgbw2);
      const res = await request(server).patch('/api/rgbw2/123');
      expect(res.statusCode).toBe(500);
    });
  });
});
