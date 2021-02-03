// tslint:disable-next-line:no-var-requires
require('dotenv-safe').config();
import 'jest';
import 'reflect-metadata';
import request, { Response } from 'supertest';
import { Helper } from '../../../helper';

describe('happy - label.task', () => {
  const helper = new Helper();

  beforeAll(async () => {
    // Before all tests
    await helper.init();
  });

  afterAll(async () => {
    // After all tests
    await helper.shutdown();
  });

  it('should be able to get a list of all tasks of the label', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .get('/api/label/1/task')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.data.length).toBe(2);
        expect(res.body.data[0].id).toBe('1');
        expect(res.body.data[0].name).toBe('TestTask1');
        expect(res.body.data[0].description).toBe('This is the 1st test task.');
        expect(res.body.data[0].createdAt).toBeDefined();
        expect(res.body.data[0].updatedAt).toBeDefined();
        done();
      });
  });
});
