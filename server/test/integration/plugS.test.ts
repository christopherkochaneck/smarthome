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
import { PlugS } from '../../models/plugS';

let server;
describe('/api/plugS', () => {
  beforeAll(() => {
    server = require('../src/app');
  });
  afterEach(async () => {
    await PlugS.deleteMany({});
  });
  afterAll(async () => {
    await server.close();
  });

  describe('GET /', () => {
    it('should return all plugS Devices', async () => {
      const plugS = [
        { ipAdress: '192.168.1.1', title: 'MyTitle', type: 'plugS' },
        { ipAdress: '192.168.1.2', title: 'MyTitle2', type: 'plugS' },
        { ipAdress: '192.168.1.3', title: 'MyTitle3', type: 'plugS' },
      ];
      await PlugS.collection.insertMany(plugS);

      const res = await request(server).get('/api/plugS');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(3);
      expect(res.body.some((x) => x.title === 'MyTitle')).toBeTruthy();
      expect(res.body.some((x) => x.title === 'MyTitle2')).toBeTruthy();
      expect(res.body.some((x) => x.title === 'MyTitle3')).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    it('should return a PlugS device if given a valid id', async () => {
      const plugS = {
        ipAdress: '192.168.1.1',
        title: 'MyTitle',
        type: 'plugS',
      };
      const insertedDevice = await PlugS.collection.insertOne(plugS);
      const res = await request(server).get(
        `/api/plugS/${insertedDevice.insertedId}`
      );

      expect(res.body).toStrictEqual({
        _id: insertedDevice.insertedId.toString(),
        ipAdress: '192.168.1.1',
        title: 'MyTitle',
        type: 'plugS',
      });
    });

    it("should return a 404 if the device with given id couldn't be found", async () => {
      const plugS = {
        ipAdress: '192.168.1.1',
        title: 'MyTitle',
        type: 'plugS',
      };
      PlugS.collection.insertOne(plugS);
      const res = await request(server).get(
        '/api/plugS/5eb78994dbb89024f04a2507'
      );
      expect(res.statusCode).toBe(404);
    });

    it('should return a 500 if the id is invalid', async () => {
      const plugS = {
        ipAdress: '192.168.1.1',
        title: 'MyTitle',
        type: 'plugS',
      };
      PlugS.collection.insertOne(plugS);
      const res = await request(server).get('/api/plugS/123');
      expect(res.statusCode).toBe(500);
    });
  });

  describe('POST /', () => {
    it('should return a PlugS Object when sending a POST Request', async () => {
      const plugS = {
        ipAdress: '192.168.1.1',
        title: 'MyTitle',
        type: 'plugS',
      };
      const res = await request(server).post('/api/plugS').send(plugS);
      let plugSObject = PlugS.find({
        _id: res.body._id,
        ipAdress: plugS.ipAdress,
        title: plugS.title,
        type: plugS.type,
      });
      expect(plugSObject).not.toBe(null);
      expect(res.body).toEqual({
        __v: 0,
        _id: res.body._id,
        ipAdress: plugS.ipAdress,
        title: plugS.title,
        type: plugS.type,
      });
    });
  });

  describe('PATCH /:id', () => {
    it('should return an updated plugS Object when passed valid Data', async () => {
      const plugS = {
        ipAdress: '192.168.1.1',
        title: 'MyTitle',
        type: 'plugS',
      };
      const insertedDevice = await PlugS.collection.insertOne(plugS);
      const id = insertedDevice.insertedId.toString();
      const updatedPlugS = {
        _id: id,
        ipAdress: '192.168.1.1',
        title: 'MyUpdatedTitle',
        type: 'plugS',
      };
      const res = await request(server)
        .patch(`/api/plugS/${id}`)
        .send(updatedPlugS);

      expect(res).not.toBe(null);
      expect(res.body).toEqual(updatedPlugS);
    });

    it("should return a 404 if the device with given id couldn't be found", async () => {
      const plugS = {
        ipAdress: '192.168.1.1',
        title: 'MyTitle',
        type: 'plugS',
      };
      const insertedDevice = await PlugS.collection.insertOne(plugS);
      const id = insertedDevice.insertedId.toString();
      const updatedPlugS = {
        _id: id,
        ipAdress: '192.168.1.1',
        title: 'MyUpdatedTitle',
        type: 'plugS',
      };
      const res = await request(server)
        .patch('/api/plugS/5eb78994dbb89024f04a2507')
        .send(updatedPlugS);
      expect(res.statusCode).toBe(404);
    });

    it('should return a 500 if the id is invalid', async () => {
      const plugS = {
        ipAdress: '192.168.1.1',
        title: 'MyTitle',
        type: 'plugS',
      };
      PlugS.collection.insertOne(plugS);
      const res = await request(server).patch('/api/plugS/123');
      expect(res.statusCode).toBe(500);
    });
  });

  describe('DELETE /:id', () => {
    it('should delete a PlugS Entry and return the deleted entry when given a valid ID that is used in the DB', async () => {
      const plugS = {
        ipAdress: '192.168.1.1',
        title: 'MyTitle',
        type: 'plugS',
      };
      const insertedDevice = await PlugS.collection.insertOne(plugS);
      const id = insertedDevice.insertedId.toString();
      const res = await request(server).delete(`/api/plugS/${id}`);
      const foundPlugS = await PlugS.findById(id);
      expect(foundPlugS).toBe(null);
    });

    it("should return a 404 if the device with given id couldn't be found", async () => {
      const plugS = {
        ipAdress: '192.168.1.1',
        title: 'MyTitle',
        type: 'plugS',
      };
      const insertedDevice = await PlugS.collection.insertOne(plugS);
      const id = insertedDevice.insertedId.toString();
      const res = await request(server).delete(
        '/api/plugS/5eb78994dbb89024f04a2507'
      );
      expect(res.statusCode).toBe(404);
    });

    it('should return a 500 if the id is invalid', async () => {
      const plugS = {
        ipAdress: '192.168.1.1',
        title: 'MyTitle',
        type: 'plugS',
      };
      PlugS.collection.insertOne(plugS);
      const res = await request(server).patch('/api/plugS/123');
      expect(res.statusCode).toBe(500);
    });
  });
});
