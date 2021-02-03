import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Label } from '../../entity/label.entity';
import { Task } from '../../entity/task.entity';
import { addElement, removeElement } from '../../util/array.util';
import { validateEntity } from '../../util/validate.util';

/**
 * Get a list of all labels of a certain task.
 */
export const getTaskLabels = async (req: Request, res: Response) => {
  const taskId: string = req.params.taskId;

  try {
    const taskRepository: Repository<Task> = getRepository(Task);
    const task: Task = await taskRepository.findOneOrFail(taskId, { relations: ['trackings', 'labels'] });
    res.status(200).send({ data: task.labels });
  } catch (error) {
    res.status(404).send({ status: 'not_found' });
  }
};

/**
 * Add a list of labels to a certain task.
 */
export const addTaskLabels = async (req: Request, res: Response) => {
  const taskId: string = req.params.taskId;
  const { labels } = req.body;

  try {
    const labelIds = labels as string[];
    // Make sure there was data send in body
    if (!labelIds) {
      throw Error('no_data_found_in_body');
    }

    const taskRepository: Repository<Task> = getRepository(Task);
    const task: Task = await taskRepository.findOneOrFail(taskId, { relations: ['trackings', 'labels'] });

    const labelRepository: Repository<Label> = getRepository(Label);
    // Add all label elements to the task element
    for (const labelId of labelIds) {
      task.labels = await addElement(task.labels, labelId, labelRepository);
    }
    await validateEntity(task);
    const updatedTask: Task = await taskRepository.save(task);

    res.status(200).send({ data: updatedTask.labels });
  } catch (error) {
    res.status(400).send({ status: error.message });
  }
};

/**
 * Remove a list of labels from a certain task.
 */
export const removeTaskLabels = async (req: Request, res: Response) => {
  const taskId: string = req.params.taskId;
  const { labels } = req.body;

  try {
    const labelIds = labels as string[];
    // Make sure there was data send in body
    if (!labelIds) {
      throw Error('no_data_found_in_body');
    }

    const taskRepository: Repository<Task> = getRepository(Task);
    const task: Task = await taskRepository.findOneOrFail(taskId, { relations: ['trackings', 'labels'] });

    // Remove all label elements from the task element
    for (const labelId of labelIds) {
      task.labels = await removeElement(task.labels, labelId);
    }
    await validateEntity(task);
    const updatedTask: Task = await taskRepository.save(task);

    res.status(200).send({ data: updatedTask.labels });
  } catch (error) {
    res.status(400).send({ status: error.message });
  }
};

/**
 * Update the list of labels of a certain task.
 */
export const updateTaskLabels = async (req: Request, res: Response) => {
  const taskId: string = req.params.taskId;
  const { labels } = req.body;

  try {
    const labelIds = labels as string[];
    // Make sure there was data send in body
    if (!labelIds) {
      throw Error('no_data_found_in_body');
    }

    const labelRepository: Repository<Label> = getRepository(Label);

    const newLabels: Label[] = [];
    // Get all label elements to set from the db
    for (const labelId of labelIds) {
      const label: Label = await labelRepository.findOneOrFail(labelId);
      newLabels.push(label);
    }

    const taskRepository: Repository<Task> = getRepository(Task);
    const task: Task = await taskRepository.findOneOrFail(taskId, { relations: ['trackings', 'labels'] });
    task.labels = newLabels;

    await validateEntity(task);
    const updatedTask: Task = await taskRepository.save(task);

    res.status(200).send({ data: updatedTask.labels });
  } catch (error) {
    res.status(400).send({ status: error.message });
  }
};

/**
 * Add a single label to a certain task.
 */
export const addTaskLabel = async (req: Request, res: Response) => {
  const taskId: string = req.params.taskId;
  const labelId: string = req.params.labelId;

  try {
    const taskRepository: Repository<Task> = getRepository(Task);
    const task: Task = await taskRepository.findOneOrFail(taskId, { relations: ['trackings', 'labels'] });

    task.labels = await addElement(task.labels, labelId, getRepository(Label));
    await validateEntity(task);
    const updatedTask: Task = await taskRepository.save(task);

    res.status(200).send({ data: updatedTask.labels });
  } catch (error) {
    res.status(400).send({ status: error.message });
  }
};

/**
 * Remove a single label from a certain task.
 */
export const removeTaskLabel = async (req: Request, res: Response) => {
  const taskId: string = req.params.taskId;
  const labelId: string = req.params.labelId;

  try {
    const taskRepository: Repository<Task> = getRepository(Task);
    const task: Task = await taskRepository.findOneOrFail(taskId, { relations: ['trackings', 'labels'] });

    task.labels = await removeElement(task.labels, labelId);
    await validateEntity(task);
    const updatedTask: Task = await taskRepository.save(task);

    res.status(200).send({ data: updatedTask.labels });
  } catch (error) {
    res.status(400).send({ status: error.message });
  }
};
