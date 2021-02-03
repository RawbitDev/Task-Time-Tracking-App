// tslint:disable-next-line:no-var-requires
require('dotenv-safe').config();
import 'jest';
import 'reflect-metadata';
import request, { Response } from 'supertest';
import { Helper } from '../../../helper';

describe('bad - tracking', () => {
  const helper = new Helper();

  beforeAll(async () => {
    // Before all tests
    await helper.init();
  });

  afterAll(async () => {
    // After all tests
    await helper.shutdown();
  });

  it('should not be able to create a new tracking without a startTime', async (done) => {
    const trackingDescription = 'This is another test tracking.';

    request(helper.app)
      .post('/api/tracking')
      .send({
        description: trackingDescription,
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('missing_parameter');
        done();
      });
  });

  it('should not be able to get a tracking by an unknown id', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .get(`/api/tracking/123456`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(404)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('not_found');
        done();
      });
  });

  it('should not be able to delete a tracking with an unknown id', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .delete(`/api/tracking/123456`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(404)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('not_found');
        done();
      });
  });

  it('should not be able to update a tracking with an unknown id', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    const newTrackingDescription = 'This is a edited test tracking.';
    const newTrackingEndTime = '2020-12-31T12:00:00.000Z';

    request(helper.app)
      .patch(`/api/tracking/123456`)
      .send({
        description: newTrackingDescription,
        endTime: newTrackingEndTime,
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(404)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('not_found');
        done();
      });
  });
});
