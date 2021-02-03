import { Router } from 'express';
import {
  createTracking,
  deleteTracking,
  getTracking,
  getTrackings,
  patchTracking,
} from '../../controller/tracking/tracking.controller';

export const trackingRouter: Router = Router({ mergeParams: true });

trackingRouter.get('/', getTrackings); // Get a list of all trackings
trackingRouter.post('/', createTracking); // Create a new tracking
trackingRouter.get('/:trackingId', getTracking); // Get a certain tracking by its id
trackingRouter.delete('/:trackingId', deleteTracking); // Delete a certain tracking by its id
trackingRouter.patch('/:trackingId', patchTracking); // Update a certain tracking by its id
