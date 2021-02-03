// tslint:disable-next-line:no-var-requires
require('dotenv-safe').config();
import 'jest';
import 'reflect-metadata';
import request, { Response } from 'supertest';
import { Helper } from '../../../helper';

describe('bad - task', () => {
  const helper = new Helper();

  beforeAll(async () => {
    // Before all tests
    await helper.init();
  });

  afterAll(async () => {
    // After all tests
    await helper.shutdown();
  });

  it('should not be able to create a new task without a name', async (done) => {
    const taskDescription = 'This is another test task.';

    request(helper.app)
      .post('/api/task')
      .send({
        description: taskDescription,
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

  it('should not be able to get a task by an unknown id', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .get(`/api/task/123456`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(404)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('not_found');
        done();
      });
  });

  it('should not be able to delete a task with an unknown id', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .delete(`/api/task/123456`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(404)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.status).toBe('not_found');
        done();
      });
  });

  it('should not be able to update a task with an unknown id', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    const newTaskName = 'Edited Task';
    const newTaskDescription = 'This is a edited test task.';

    request(helper.app)
      .patch(`/api/task/123456`)
      .send({
        description: newTaskDescription,
        name: newTaskName,
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
