import { Router } from 'express';
import { getLabelTasks } from '../../controller/label/label.task.controller';

export const labelTaskRouter: Router = Router({ mergeParams: true });

labelTaskRouter.get('/', getLabelTasks); // Get a list of all tasks with the label
