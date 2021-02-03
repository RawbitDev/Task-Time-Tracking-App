// tslint:disable-next-line:no-var-requires
require("dotenv-safe").config();
import "jest";
import "reflect-metadata";
import request, { Response } from "supertest";
import { Helper } from "../../../helper";

describe("happy - task", () => {
  const helper = new Helper();

  beforeAll(async () => {
    // Before all tests
    await helper.init();
  });

  afterAll(async () => {
    // After all tests
    await helper.shutdown();
  });

  it("should be able to get a list of all tasks", async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .get("/api/task")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.data.length).toBe(3);
        expect(res.body.data[0].id).toBe("1");
        expect(res.body.data[0].name).toBe("TestTask1");
        expect(res.body.data[0].description).toBe("This is the 1st test task.");
        expect(res.body.data[0].labels.length).toBe(3);
        expect(res.body.data[0].trackings.length).toBe(3);
        expect(res.body.data[0].createdAt).toBeDefined();
        expect(res.body.data[0].updatedAt).toBeDefined();
        done();
      });
  });

  it("should be able to create a new task", async (done) => {
    const taskName = "Example Task";
    const taskDescription = "This is another test task.";

    request(helper.app)
      .post("/api/task")
      .send({
        description: taskDescription,
        name: taskName,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(201)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.data.id).toBeDefined();
        expect(res.body.data.name).toBe(taskName);
        expect(res.body.data.description).toBe(taskDescription);
        expect(res.body.data.createdAt).toBeDefined();
        expect(res.body.data.updatedAt).toBeDefined();
        done();
      });
  });

  it("should be able to get a certain task by its id", async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .get(`/api/task/2`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.data.id).toBe("2");
        expect(res.body.data.name).toBe("TestTask2");
        expect(res.body.data.description).toBe("This is the 2nd test task.");
        expect(res.body.data.labels.length).toBe(2);
        expect(res.body.data.createdAt).toBeDefined();
        expect(res.body.data.updatedAt).toBeDefined();
        done();
      });
  });

  it("should be able to delete a certain task by its id", async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .delete(`/api/task/3`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(204)
      .end((error: Error, _: Response) => {
        if (error) throw error;
        done();
      });
  });

  it("should be able to update a certain task by its id", async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    const newTaskName = "Edited Task";
    const newTaskDescription = "This is a edited test task.";

    request(helper.app)
      .patch(`/api/task/1`)
      .send({
        description: newTaskDescription,
        name: newTaskName,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.data.id).toBe("1");
        expect(res.body.data.name).toBe(newTaskName);
        expect(res.body.data.description).toBe(newTaskDescription);
        expect(res.body.data.labels.length).toBe(3);
        expect(res.body.data.trackings.length).toBe(3);
        expect(res.body.data.createdAt).toBeDefined();
        expect(res.body.data.updatedAt).toBeDefined();
        expect(res.body.data.updatedAt).not.toBe(res.body.data.createdAt);
        done();
      });
  });

  it("should be able to update a task without any parameters set resulting in only description getting removed", async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .patch(`/api/task/1`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.data.id).toBe("1");
        expect(res.body.data.name).toBe("TestTask1");
        expect(res.body.data.description).toBe("");
        expect(res.body.data.labels.length).toBe(3);
        expect(res.body.data.trackings.length).toBe(3);
        expect(res.body.data.createdAt).toBeDefined();
        expect(res.body.data.updatedAt).toBeDefined();
        done();
      });
  });

  it("should be able to use an external API to get ideas what to do today", async (done) => {
    request(helper.app)
      .get(`/api/task/example`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end((error: Error, res: Response) => {
        if (error) throw error;
        expect(res.body.data).toBeDefined();
        done();
      });
  });
});
