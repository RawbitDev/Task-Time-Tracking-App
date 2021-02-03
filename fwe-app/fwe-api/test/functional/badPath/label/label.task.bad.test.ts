// tslint:disable-next-line:no-var-requires
require('dotenv-safe').config();
import 'jest';
import 'reflect-metadata';
import request, { Response } from 'supertest';
import { Helper } from '../../../helper';

describe('bad - label.task', () => {
  const helper = new Helper();

  beforeAll(async () => {
    // Before all tests
    await helper.init();
  });

  afterAll(async () => {
    // After all tests
    await helper.shutdown();
  });

  it('should not be able to get a list of all tasks by an unknown id', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .get('/api/label/123456/task')
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
