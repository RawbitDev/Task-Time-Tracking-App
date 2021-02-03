import { Router } from 'express';
import {
  addTaskTracking,
  addTaskTrackings,
  getTaskTrackings,
  removeTaskTracking,
  removeTaskTrackings,
  updateTaskTrackings,
} from '../../controller/task/task.tracking.controller';

export const taskTrackingRouter: Router = Router({ mergeParams: true });

taskTrackingRouter.get('/', getTaskTrackings); // Get a list of all trackings of a certain task
taskTrackingRouter.post('/', addTaskTrackings); // Add a list of trackings to a certain task
taskTrackingRouter.delete('/', removeTaskTrackings); // Remove a list of trackings from a certain task
taskTrackingRouter.patch('/', updateTaskTrackings); // Update the list of trackings of a certain task
taskTrackingRouter.post('/:trackingId', addTaskTracking); // Add a single tracking to a certain task
taskTrackingRouter.delete('/:trackingId', removeTaskTracking); // Remove a single tracking from a certain task
