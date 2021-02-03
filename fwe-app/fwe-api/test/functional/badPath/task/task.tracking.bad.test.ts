// tslint:disable-next-line:no-var-requires
require('dotenv-safe').config();
import 'jest';
import 'reflect-metadata';
import request, { Response } from 'supertest';
import { Helper } from '../../../helper';

describe('bad - task.tracking', () => {
  const helper = new Helper();

  beforeAll(async () => {
    // Before all tests
    await helper.init();
  });

  afterAll(async () => {
    // After all tests
    await helper.shutdown();
  });

  it('should not be able to get a list of all trackings by an unknown task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .get('/api/task/123456/tracking')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(404)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('not_found');
        done();
      });
  });

  it('should not be able to add a list of trackings to an unknown task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .post('/api/task/123456/tracking')
      .send({
        trackings: ['2', '3'],
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('Could not find any entity of type "Task" matching: "123456"');
        done();
      });
  });

  it('should not be able to add a list of unknown trackings to a task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .post('/api/task/2/tracking')
      .send({
        trackings: ['123456', '654321'],
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('Could not find any entity of type "Tracking" matching: "123456"');
        done();
      });
  });

  it('should not be able to add a empty list of trackings to a task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .post('/api/task/2/tracking')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('no_data_found_in_body');
        done();
      });
  });

  it('should not be able to add a list of trackings to a task that already contains the trackings', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .post('/api/task/1/tracking')
      .send({
        trackings: ['2', '3'],
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('already_added');
        done();
      });
  });

  it('should not be able to remove a list of trackings from an unknown task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .delete('/api/task/123456/tracking')
      .send({
        trackings: ['1', '3'],
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('Could not find any entity of type "Task" matching: "123456"');
        done();
      });
  });

  it('should not be able to remove a list of unknown trackings from a task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .delete('/api/task/1/tracking')
      .send({
        trackings: ['123456', '654321'],
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('already_removed');
        done();
      });
  });

  it('should not be able to remove a empty list of trackings from a task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .delete('/api/task/1/tracking')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('no_data_found_in_body');
        done();
      });
  });

  it('should not be able to remove a list of trackings from a task that not contains the trackings', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .delete('/api/task/2/tracking')
      .send({
        trackings: ['2', '3'],
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('already_removed');
        done();
      });
  });

  it('should not be able to update the list of trackings of an unknown task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .patch('/api/task/123456/tracking')
      .send({
        trackings: ['2', '3'],
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('Could not find any entity of type "Task" matching: "123456"');
        done();
      });
  });

  it('should not be able to update a list of trackings with an empty list', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .patch('/api/task/1/tracking')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('no_data_found_in_body');
        done();
      });
  });

  it('should not be able to add a single tracking to an unknown task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .post('/api/task/123456/tracking/2')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('Could not find any entity of type "Task" matching: "123456"');
        done();
      });
  });

  it('should not be able to add a unknown single tracking to an existing task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .post('/api/task/2/tracking/123456')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('Could not find any entity of type "Tracking" matching: "123456"');
        done();
      });
  });

  it('should not be able to add a tracking to a task that already contains the tracking', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .post('/api/task/1/tracking/1')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('already_added');
        done();
      });
  });

  it('should not be able to remove a single tracking to an unknown task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .delete('/api/task/123456/tracking/1')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('Could not find any entity of type "Task" matching: "123456"');
        done();
      });
  });

  it('should not be able to remove a unknown tracking to an existing task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .delete('/api/task/1/tracking/123456')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('already_removed');
        done();
      });
  });

  it('should not be able to remove a tracking from a task that not contains the tracking', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .delete('/api/task/2/tracking/1')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('already_removed');
        done();
      });
  });
});
