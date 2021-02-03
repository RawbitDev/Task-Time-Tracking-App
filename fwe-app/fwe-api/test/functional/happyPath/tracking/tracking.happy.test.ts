// tslint:disable-next-line:no-var-requires
require('dotenv-safe').config();
import 'jest';
import 'reflect-metadata';
import request, { Response } from 'supertest';
import { Helper } from '../../../helper';

describe('happy - tracking', () => {
  const helper = new Helper();

  beforeAll(async () => {
    // Before all tests
    await helper.init();
  });

  afterAll(async () => {
    // After all tests
    await helper.shutdown();
  });

  it('should be able to get a list of all trackings', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .get('/api/tracking')
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

  it('should be able to create a new tracking', async (done) => {
    const trackingDescription = 'This is another test tracking.';
    const trackingStartTime = '2020-12-24T00:00:00.000Z';

    request(helper.app)
      .post('/api/tracking')
      .send({
        description: trackingDescription,
        startTime: trackingStartTime,
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(201)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.data.id).toBeDefined();
        expect(res.body.data.description).toBe(trackingDescription);
        expect(res.body.data.startTime).toBe(trackingStartTime);
        expect(res.body.data.createdAt).toBeDefined();
        expect(res.body.data.updatedAt).toBeDefined();
        done();
      });
  });

  it('should be able to create a new tracking without a description', async (done) => {
    const trackingStartTime = '2020-12-24T00:00:00.000Z';

    request(helper.app)
      .post('/api/tracking')
      .send({
        startTime: trackingStartTime,
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(201)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.data.id).toBeDefined();
        expect(res.body.data.description).toBeNull();
        expect(res.body.data.startTime).toBe(trackingStartTime);
        expect(res.body.data.createdAt).toBeDefined();
        expect(res.body.data.updatedAt).toBeDefined();
        done();
      });
  });

  it('should be able to get a certain tracking by its id', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .get(`/api/tracking/2`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.data.id).toBe('2');
        expect(res.body.data.description).toBe('This is the 2nd test tracking.');
        expect(res.body.data.startTime).toBe('2020-11-15T12:00:00.000Z');
        expect(res.body.data.createdAt).toBeDefined();
        expect(res.body.data.updatedAt).toBeDefined();
        done();
      });
  });

  it('should be able to delete a certain tracking by its id', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .delete(`/api/tracking/3`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(204)
      .end((error: Error, _: Response) => {
        if (error) throw error;
        done();
      });
  });

  it('should be able to update a certain tracking by its id', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    const newTrackingDescription = 'This is a edited test tracking.';
    const newTrackingStartTime = '2020-12-31T11:00:00.000Z';
    const newTrackingEndTime = '2020-12-31T12:00:00.000Z';

    request(helper.app)
      .patch(`/api/tracking/1`)
      .send({
        description: newTrackingDescription,
        endTime: newTrackingEndTime,
        startTime: newTrackingStartTime,
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.data.id).toBe('1');
        expect(res.body.data.description).toBe(newTrackingDescription);
        expect(res.body.data.startTime).toBe(newTrackingStartTime);
        expect(res.body.data.endTime).toBe(newTrackingEndTime);
        expect(res.body.data.createdAt).toBeDefined();
        expect(res.body.data.updatedAt).toBeDefined();
        expect(res.body.data.updatedAt).not.toBe(res.body.data.createdAt);
        done();
      });
  });

  it('should be able to update a tracking without any parameters set resulting in no changes', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .patch(`/api/tracking/1`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.data.id).toBe('1');
        expect(res.body.data.description).toBe('This is the 1st test tracking.');
        expect(res.body.data.startTime).toBe('2020-11-15T10:00:00.000Z');
        expect(res.body.data.endTime).toBeNull();
        expect(res.body.data.createdAt).toBeDefined();
        expect(res.body.data.updatedAt).toBeDefined();
        done();
      });
  });
});
