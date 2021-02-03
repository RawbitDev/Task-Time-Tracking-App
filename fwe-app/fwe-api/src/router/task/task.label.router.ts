import { Router } from 'express';
import {
  addTaskLabel,
  addTaskLabels,
  getTaskLabels,
  removeTaskLabel,
  removeTaskLabels,
  updateTaskLabels,
} from '../../controller/task/task.label.controller';

export const taskLabelRouter: Router = Router({ mergeParams: true });

taskLabelRouter.get('/', getTaskLabels); // Get a list of all labels of a certain task
taskLabelRouter.post('/', addTaskLabels); // Add a list of labels to a certain task
taskLabelRouter.delete('/', removeTaskLabels); // Remove a list of labels from a certain task
taskLabelRouter.patch('/', updateTaskLabels); // Update the list of labels of a certain task
taskLabelRouter.post('/:labelId', addTaskLabel); // Add a single label to a certain task
taskLabelRouter.delete('/:labelId', removeTaskLabel); // Remove a single label from a certain task
