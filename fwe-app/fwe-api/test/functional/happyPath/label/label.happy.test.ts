// tslint:disable-next-line:no-var-requires
require('dotenv-safe').config();
import 'jest';
import 'reflect-metadata';
import request, { Response } from 'supertest';
import { Helper } from '../../../helper';

describe('happy - label', () => {
  const helper = new Helper();

  beforeAll(async () => {
    // Before all tests
    await helper.init();
  });

  afterAll(async () => {
    // After all tests
    await helper.shutdown();
  });

  it('should be able to get a list of all labels', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .get('/api/label')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.data.length).toBe(3);
        expect(res.body.data[0].id).toBe('1');
        expect(res.body.data[0].name).toBe('TestLabel1');
        expect(res.body.data[0].createdAt).toBeDefined();
        expect(res.body.data[0].updatedAt).toBeDefined();
        done();
      });
  });

  it('should be able to create a new label', async (done) => {
    const labelName = 'Example Label';

    request(helper.app)
      .post('/api/label')
      .send({
        name: labelName,
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(201)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.data.id).toBeDefined();
        expect(res.body.data.name).toBe(labelName);
        expect(res.body.data.createdAt).toBeDefined();
        expect(res.body.data.updatedAt).toBeDefined();
        done();
      });
  });

  it('should be able to get a certain label by its id', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .get(`/api/label/2`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.data.id).toBe('2');
        expect(res.body.data.name).toBe('TestLabel2');
        expect(res.body.data.createdAt).toBeDefined();
        expect(res.body.data.updatedAt).toBeDefined();
        done();
      });
  });

  it('should be able to delete a certain label by its id', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .delete(`/api/label/3`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(204)
      .end((error: Error, _: Response) => {
        if (error) throw error;
        done();
      });
  });

  it('should be able to update a certain label by its id', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const newLabelName = 'Edited Label';

    request(helper.app)
      .patch(`/api/label/1`)
      .send({
        name: newLabelName,
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.data.id).toBe('1');
        expect(res.body.data.name).toBe(newLabelName);
        expect(res.body.data.createdAt).toBeDefined();
        expect(res.body.data.updatedAt).toBeDefined();
        expect(res.body.data.updatedAt).not.toBe(res.body.data.createdAt);
        done();
      });
  });

  it('should be able to update a label without any parameters set resulting in no changes', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .patch(`/api/label/1`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.data.id).toBe('1');
        expect(res.body.data.name).toBe('TestLabel1');
        expect(res.body.data.createdAt).toBeDefined();
        expect(res.body.data.updatedAt).toBeDefined();
        done();
      });
  });
});
