import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Task } from '../../entity/task.entity';
import { Tracking } from '../../entity/tracking.entity';
import { addElement, removeElement } from '../../util/array.util';
import { validateEntity } from '../../util/validate.util';

/**
 * Get a list of all trackings of a certain task.
 */
export const getTaskTrackings = async (req: Request, res: Response) => {
  const taskId: string = req.params.taskId;

  try {
    const taskRepository: Repository<Task> = getRepository(Task);
    const task: Task = await taskRepository.findOneOrFail(taskId, { relations: ['trackings', 'labels'] });

    res.status(200).send({ data: task.trackings });
  } catch (error) {
    res.status(404).send({ status: 'not_found' });
  }
};

/**
 * Add a list of trackings to a certain task.
 */
export const addTaskTrackings = async (req: Request, res: Response) => {
  const taskId: string = req.params.taskId;
  const { trackings } = req.body;

  try {
    const trackingIds = trackings as string[];
    // Make sure there was data send in body
    if (!trackingIds) {
      throw Error('no_data_found_in_body');
    }

    const taskRepository: Repository<Task> = getRepository(Task);
    const task: Task = await taskRepository.findOneOrFail(taskId, { relations: ['trackings', 'labels'] });

    const trackingRepository: Repository<Tracking> = getRepository(Tracking);
    // Add all tracking elements to the task element
    for (const trackingId of trackingIds) {
      task.trackings = await addElement(task.trackings, trackingId, trackingRepository);
    }
    await validateEntity(task);
    const updatedTask: Task = await taskRepository.save(task);

    res.status(200).send({ data: updatedTask.trackings });
  } catch (error) {
    res.status(400).send({ status: error.message });
  }
};

/**
 * Remove a list of trackings from a certain task.
 */
export const removeTaskTrackings = async (req: Request, res: Response) => {
  const taskId: string = req.params.taskId;
  const { trackings } = req.body;

  try {
    const trackingIds = trackings as string[];
    // Make sure there was data send in body
    if (!trackingIds) {
      throw Error('no_data_found_in_body');
    }

    const taskRepository: Repository<Task> = getRepository(Task);
    const task: Task = await taskRepository.findOneOrFail(taskId, { relations: ['trackings', 'labels'] });

    // Remove all tracking elements from the task element
    for (const trackingId of trackingIds) {
      task.trackings = await removeElement(task.trackings, trackingId);
    }
    await validateEntity(task);
    const updatedTask: Task = await taskRepository.save(task);

    res.status(200).send({ data: updatedTask.trackings });
  } catch (error) {
    res.status(400).send({ status: error.message });
  }
};

/**
 * Update the list of trackings of a certain task.
 */
export const updateTaskTrackings = async (req: Request, res: Response) => {
  const taskId: string = req.params.taskId;
  const { trackings } = req.body;

  try {
    const trackingIds = trackings as string[];
    // Make sure there was data send in body
    if (!trackingIds) {
      throw Error('no_data_found_in_body');
    }

    const trackingRepository: Repository<Tracking> = getRepository(Tracking);

    const newTrackings: Tracking[] = [];
    // Get all tracking elements to set from the db
    for (const trackingId of trackingIds) {
      const tracking: Tracking = await trackingRepository.findOneOrFail(trackingId);
      newTrackings.push(tracking);
    }

    const taskRepository: Repository<Task> = getRepository(Task);
    const task: Task = await taskRepository.findOneOrFail(taskId, { relations: ['trackings', 'labels'] });
    task.trackings = newTrackings;

    await validateEntity(task);
    const updatedTask: Task = await taskRepository.save(task);

    res.status(200).send({ data: updatedTask.trackings });
  } catch (error) {
    res.status(400).send({ status: error.message });
  }
};

/**
 * Add a single tracking to a certain task.
 */
export const addTaskTracking = async (req: Request, res: Response) => {
  const taskId: string = req.params.taskId;
  const trackingId: string = req.params.trackingId;

  try {
    const taskRepository: Repository<Task> = getRepository(Task);
    const task: Task = await taskRepository.findOneOrFail(taskId, { relations: ['trackings', 'labels'] });

    task.trackings = await addElement(task.trackings, trackingId, getRepository(Tracking));
    await validateEntity(task);
    const updatedTask: Task = await taskRepository.save(task);

    res.status(200).send({ data: updatedTask.trackings });
  } catch (error) {
    res.status(400).send({ status: error.message });
  }
};

/**
 * Remove a single tracking from a certain task.
 */
export const removeTaskTracking = async (req: Request, res: Response) => {
  const taskId: string = req.params.taskId;
  const trackingId: string = req.params.trackingId;

  try {
    const taskRepository: Repository<Task> = getRepository(Task);
    const task: Task = await taskRepository.findOneOrFail(taskId, { relations: ['trackings', 'labels'] });

    task.trackings = await removeElement(task.trackings, trackingId);
    await validateEntity(task);
    const updatedTask: Task = await taskRepository.save(task);

    res.status(200).send({ data: updatedTask.trackings });
  } catch (error) {
    res.status(400).send({ status: error.message });
  }
};
