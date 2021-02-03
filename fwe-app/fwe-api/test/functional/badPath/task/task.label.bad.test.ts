// tslint:disable-next-line:no-var-requires
require('dotenv-safe').config();
import 'jest';
import 'reflect-metadata';
import request, { Response } from 'supertest';
import { Helper } from '../../../helper';

describe('bad - task.label', () => {
  const helper = new Helper();

  beforeAll(async () => {
    // Before all tests
    await helper.init();
  });

  afterAll(async () => {
    // After all tests
    await helper.shutdown();
  });

  it('should not be able to get a list of all labels by an unknown task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .get('/api/task/123456/label')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(404)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('not_found');
        done();
      });
  });

  it('should not be able to add a list of labels to an unknown task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .post('/api/task/123456/label')
      .send({
        labels: ['2', '3'],
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

  it('should not be able to add a list of unknown labels to a task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .post('/api/task/3/label')
      .send({
        labels: ['123456', '654321'],
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('Could not find any entity of type "Label" matching: "123456"');
        done();
      });
  });

  it('should not be able to add a empty list of labels to a task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .post('/api/task/3/label')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('no_data_found_in_body');
        done();
      });
  });

  it('should not be able to add a list of labels to a task that already contains the labels', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .post('/api/task/1/label')
      .send({
        labels: ['2', '3'],
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

  it('should not be able to remove a list of labels from an unknown task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .delete('/api/task/123456/label')
      .send({
        labels: ['1', '3'],
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

  it('should not be able to remove a list of unknown labels from a task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .delete('/api/task/1/label')
      .send({
        labels: ['123456', '654321'],
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

  it('should not be able to remove a empty list of labels from a task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .delete('/api/task/1/label')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('no_data_found_in_body');
        done();
      });
  });

  it('should not be able to remove a list of labels from a task that not contains the labels', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .delete('/api/task/3/label')
      .send({
        labels: ['2', '3'],
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

  it('should not be able to update the list of labels of an unknown task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .patch('/api/task/123456/label')
      .send({
        labels: ['2', '3'],
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

  it('should not be able to update a list of labels with an empty list', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .patch('/api/task/1/label')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('no_data_found_in_body');
        done();
      });
  });

  it('should not be able to add a single label to an unknown task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .post('/api/task/123456/label/2')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('Could not find any entity of type "Task" matching: "123456"');
        done();
      });
  });

  it('should not be able to add a unknown single label to an existing task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .post('/api/task/3/label/123456')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('Could not find any entity of type "Label" matching: "123456"');
        done();
      });
  });

  it('should not be able to add a label to a task that already contains the label', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .post('/api/task/1/label/1')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('already_added');
        done();
      });
  });

  it('should not be able to remove a single label to an unknown task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .delete('/api/task/123456/label/1')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('Could not find any entity of type "Task" matching: "123456"');
        done();
      });
  });

  it('should not be able to remove a unknown label to an existing task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .delete('/api/task/1/label/123456')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('already_removed');
        done();
      });
  });

  it('should not be able to remove a label from a task that not contains the label', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .delete('/api/task/3/label/1')
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
