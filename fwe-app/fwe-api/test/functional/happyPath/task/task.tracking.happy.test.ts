// tslint:disable-next-line:no-var-requires
require('dotenv-safe').config();
import 'jest';
import 'reflect-metadata';
import request, { Response } from 'supertest';
import { Helper } from '../../../helper';

describe('happy - task.tracking', () => {
  const helper = new Helper();

  beforeAll(async () => {
    // Before all tests
    await helper.init();
  });

  afterAll(async () => {
    // After all tests
    await helper.shutdown();
  });

  it('should be able to get a list of all trackings of a certain task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .get('/api/task/1/tracking')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.data.length).toBe(3);
        expect(res.body.data[0].id).toBe('1');
        expect(res.body.data[0].description).toBe('This is the 1st test tracking.');
        expect(res.body.data[0].startTime).toBe('2020-11-15T10:00:00.000Z');
        expect(res.body.data[0].createdAt).toBeDefined();
        expect(res.body.data[0].updatedAt).toBeDefined();
        done();
      });
  });

  it('should be able to add a list of trackings to a certain task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .post('/api/task/2/tracking')
      .send({
        trackings: ['2', '3'],
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.data.length).toBe(2);
        expect(res.body.data[0].id).toBe('2');
        expect(res.body.data[0].description).toBe('This is the 2nd test tracking.');
        expect(res.body.data[0].startTime).toBe('2020-11-15T12:00:00.000Z');
        expect(res.body.data[0].createdAt).toBeDefined();
        expect(res.body.data[0].updatedAt).toBeDefined();
        done();
      });
  });

  it('should be able to remove a list of trackings from a certain task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .delete('/api/task/1/tracking')
      .send({
        trackings: ['1', '3'],
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.data.length).toBe(1);
        expect(res.body.data[0].id).toBe('2');
        expect(res.body.data[0].description).toBe('This is the 2nd test tracking.');
        expect(res.body.data[0].startTime).toBe('2020-11-15T12:00:00.000Z');
        expect(res.body.data[0].createdAt).toBeDefined();
        expect(res.body.data[0].updatedAt).toBeDefined();
        done();
      });
  });

  it('should be able to update the list of trackings of a certain task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .patch('/api/task/1/tracking')
      .send({
        trackings: ['2', '3'],
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.data.length).toBe(2);
        expect(res.body.data[0].id).toBe('2');
        expect(res.body.data[0].description).toBe('This is the 2nd test tracking.');
        expect(res.body.data[0].startTime).toBe('2020-11-15T12:00:00.000Z');
        expect(res.body.data[0].createdAt).toBeDefined();
        expect(res.body.data[0].updatedAt).toBeDefined();
        done();
      });
  });

  it('should be able to add a single tracking to a certain task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .post('/api/task/2/tracking/2')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.data.length).toBe(1);
        expect(res.body.data[0].id).toBe('2');
        expect(res.body.data[0].description).toBe('This is the 2nd test tracking.');
        expect(res.body.data[0].startTime).toBe('2020-11-15T12:00:00.000Z');
        expect(res.body.data[0].createdAt).toBeDefined();
        expect(res.body.data[0].updatedAt).toBeDefined();
        done();
      });
  });

  it('should be able to remove a single tracking to a certain task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .delete('/api/task/1/tracking/1')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.data.length).toBe(2);
        expect(res.body.data[0].id).toBe('2');
        expect(res.body.data[0].description).toBe('This is the 2nd test tracking.');
        expect(res.body.data[0].startTime).toBe('2020-11-15T12:00:00.000Z');
        expect(res.body.data[0].createdAt).toBeDefined();
        expect(res.body.data[0].updatedAt).toBeDefined();
        done();
      });
  });
});
