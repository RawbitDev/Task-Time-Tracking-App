import { Router } from 'express';
import {
  createTask,
  deleteTask,
  getExampleTask,
  getTask,
  getTasks,
  patchTask,
} from '../../controller/task/task.controller';
import { taskLabelRouter } from './task.label.router';
import { taskTrackingRouter } from './task.tracking.router';

export const taskRouter: Router = Router({ mergeParams: true });

taskRouter.get('/', getTasks); // Get a list of all tasks
taskRouter.post('/', createTask); // Create a new task

taskRouter.get('/example', getExampleTask); // Using external API to get ideas what to do today

taskRouter.get('/:taskId', getTask); // Get a certain task by its id
taskRouter.delete('/:taskId', deleteTask); // Delete a certain task by its id
taskRouter.patch('/:taskId', patchTask); // Update a certain task by its id

taskRouter.use('/:taskId/label', taskLabelRouter);
taskRouter.use('/:taskId/tracking', taskTrackingRouter);
