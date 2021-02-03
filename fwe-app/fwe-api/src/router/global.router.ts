import { Router } from 'express';
import { labelRouter } from './label/label.router';
import { taskRouter } from './task/task.router';
import { trackingRouter } from './tracking/tracking.router';

export const globalRouter: Router = Router({ mergeParams: true });

globalRouter.use('/label', labelRouter);
globalRouter.use('/task', taskRouter);
globalRouter.use('/tracking', trackingRouter);
