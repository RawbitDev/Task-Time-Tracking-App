import { Router } from 'express';
import { createLabel, deleteLabel, getLabel, getLabels, patchLabel } from '../../controller/label/label.controller';
import { labelTaskRouter } from './label.task.router';

export const labelRouter: Router = Router({ mergeParams: true });

labelRouter.get('/', getLabels); // Get a list of all labels
labelRouter.post('/', createLabel); // Create a new label
labelRouter.get('/:labelId', getLabel); // Get a certain label by its id
labelRouter.delete('/:labelId', deleteLabel); // Delete a certain label by its id
labelRouter.patch('/:labelId', patchLabel); // Update a certain label by its id

labelRouter.use('/:labelId/task', labelTaskRouter);
