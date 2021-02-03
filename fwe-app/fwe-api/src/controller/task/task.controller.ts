import { Request, Response } from 'express';
import fetch from 'node-fetch';
import { getRepository, Repository } from 'typeorm';
import { Task } from '../../entity/task.entity';
import { validateEntity } from '../../util/validate.util';

/**
 * Get a list of all tasks.
 */
export const getTasks = async (_: Request, res: Response) => {
  const taskRepository: Repository<Task> = getRepository(Task);
  const tasks: Task[] = await taskRepository.find({ relations: ['trackings', 'labels'] });

  res.status(200).send({ data: tasks });
};

/**
 * Create a new task.
 */
export const createTask = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  try {
    const task: Task = new Task();
    task.name = name;
    task.description = description;

    await validateEntity(task);
    const taskRepository: Repository<Task> = getRepository(Task);
    const createdTask: Task = await taskRepository.save(task);

    res.status(201).send({ data: createdTask });
  } catch (error) {
    res.status(400).send({ status: 'missing_parameter' });
  }
};

/**
 * Get a certain task by its id.
 */
export const getTask = async (req: Request, res: Response) => {
  const taskId: string = req.params.taskId;

  try {
    const taskRepository: Repository<Task> = getRepository(Task);
    const task: Task = await taskRepository.findOneOrFail(taskId, { relations: ['trackings', 'labels'] });

    res.status(200).send({ data: task });
  } catch (error) {
    res.status(404).send({ status: 'not_found' });
  }
};

/**
 * Delete a certain task by its id.
 */
export const deleteTask = async (req: Request, res: Response) => {
  const taskId: string = req.params.taskId;

  try {
    const taskRepository: Repository<Task> = getRepository(Task);
    const task: Task = await taskRepository.findOneOrFail(taskId);
    await taskRepository.remove(task);

    res.status(204).send();
  } catch (error) {
    res.status(404).send({ status: 'not_found' });
  }
};

/**
 * Update a certain task by its id.
 */
export const patchTask = async (req: Request, res: Response) => {
  const taskId: string = req.params.taskId;
  const { name, description } = req.body;

  try {
    const taskRepository: Repository<Task> = getRepository(Task);
    const task: Task = await taskRepository.findOneOrFail(taskId, { relations: ['trackings', 'labels'] });
    // Don't update attributes with null or undefined
    task.name = name || task.name;
    task.description = description || ''; // So the description can be an empty string

    await validateEntity(task);
    const updatedTask = await taskRepository.save(task);

    res.status(200).send({ data: updatedTask });
  } catch (error) {
    res.status(404).send({ status: 'not_found' });
  }
};

/**
 * Using external API to get ideas what to do today.
 */
export const getExampleTask = async (_: Request, res: Response) => {
  // Get a random activity for today by the public bored api
  const response = await fetch('https://www.boredapi.com/api/activity/', {
    method: 'GET',
  });
  const task = await response.json();

  res.status(200).send({ data: task.activity });
};
