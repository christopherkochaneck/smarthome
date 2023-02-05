import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
} from '@jest/globals';
import { Group } from '../../models/group';
import request from 'supertest';
import { json } from 'stream/consumers';

let server;
describe('/api/plugs', () => {
  beforeAll(() => {
    server = require('../../src/app');
  });
  afterEach(async () => {
    await Group.deleteMany({});
  });
  afterAll(async () => {
    await server.close();
  });
  it('should return all Groups', async () => {
    const groups = [
      { name: 'Group1', ids: ['123123123', '11111', '222222'] },
      { name: 'Group2', ids: ['123312231', '11122211', '2333322222'] },
      { name: 'Group3', ids: ['1231222223123', '11113331111', '222222222'] },
    ];
    await Group.collection.insertMany(groups);

    const res = await request(server).get('/api/group');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(3);
    expect(
      res.body.some(
        (x) =>
          x.name === 'Group1' &&
          JSON.stringify(x.ids) ===
            JSON.stringify(['123123123', '11111', '222222'])
      )
    ).toBeTruthy();
    expect(
      res.body.some(
        (x) =>
          x.name === 'Group2' &&
          JSON.stringify(x.ids) ===
            JSON.stringify(['123312231', '11122211', '2333322222'])
      )
    ).toBeTruthy();
    expect(
      res.body.some(
        (x) =>
          x.name === 'Group3' &&
          JSON.stringify(x.ids) ===
            JSON.stringify(['1231222223123', '11113331111', '222222222'])
      )
    ).toBeTruthy();
  });

  describe('GET /:id', () => {
    it('should return one matching Entry if given a valid id', async () => {
      const group = { name: 'Group1', ids: ['123123123', '11111', '222222'] };
      const inserted = await Group.collection.insertOne(group);

      const res = await request(server).get(
        `/api/group/${inserted.insertedId}`
      );

      expect(res.status).toBe(200);
    });

    it("should return a 404 if an element with the given id doesn't exist in the database", async () => {
      const res = await request(server).get(
        '/api/group/63c43775c0424dcd47184123'
      );

      expect(res.status).toBe(404);
    });

    it('should return a 500 when the given ID is invalid', async () => {
      const res = await request(server).get('/api/group/123');

      expect(res.status).toBe(500);
    });
  });

  describe('POST /', () => {
    it('should create an Entry in the DB and return the created Document', async () => {});
  });
});
