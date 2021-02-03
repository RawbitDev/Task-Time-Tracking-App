import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Tracking } from '../../entity/tracking.entity';
import { validateEntity } from '../../util/validate.util';

/**
 * Get a list of all trackings.
 */
export const getTrackings = async (_: Request, res: Response) => {
  const trackingRepository: Repository<Tracking> = getRepository(Tracking);
  const trackings: Tracking[] = await trackingRepository.find({ relations: ['task'] });
  res.status(200).send({ data: trackings });
};

/**
 * Create a new tracking.
 */
export const createTracking = async (req: Request, res: Response) => {
  const { description, startTime, endTime } = req.body;

  try {
    const tracking: Tracking = new Tracking();
    tracking.description = description;
    tracking.startTime = startTime;
    tracking.endTime = endTime;

    await validateEntity(tracking);
    const trackingRepository: Repository<Tracking> = getRepository(Tracking);
    const createdTracking: Tracking = await trackingRepository.save(tracking);

    res.status(201).send({ data: createdTracking });
  } catch (error) {
    res.status(400).send({ status: 'missing_parameter' });
  }
};

/**
 * Get a certain tracking by its id.
 */
export const getTracking = async (req: Request, res: Response) => {
  const trackingId: string = req.params.trackingId;

  try {
    const trackingRepository: Repository<Tracking> = getRepository(Tracking);
    const tracking: Tracking = await trackingRepository.findOneOrFail(trackingId, { relations: ['task'] });

    res.status(200).send({ data: tracking });
  } catch (error) {
    res.status(404).send({ status: 'not_found' });
  }
};

/**
 * Delete a certain tracking by its id.
 */
export const deleteTracking = async (req: Request, res: Response) => {
  const trackingId: string = req.params.trackingId;

  try {
    const trackingRepository: Repository<Tracking> = getRepository(Tracking);
    const tracking: Tracking = await trackingRepository.findOneOrFail(trackingId, { relations: ['task'] });
    await trackingRepository.remove(tracking);

    res.status(204).send();
  } catch (error) {
    res.status(404).send({ status: 'not_found' });
  }
};

/**
 * Update a certain tracking by its id.
 */
export const patchTracking = async (req: Request, res: Response) => {
  const trackingId: string = req.params.trackingId;
  const { description, startTime, endTime } = req.body;

  try {
    const trackingRepository: Repository<Tracking> = getRepository(Tracking);
    const tracking: Tracking = await trackingRepository.findOneOrFail(trackingId, { relations: ['task'] });
    // Don't update attributes with null or undefined
    tracking.description = description || tracking.description;
    tracking.startTime = startTime || tracking.startTime;
    tracking.endTime = endTime || tracking.endTime;

    await validateEntity(tracking);
    const updatedTracking = await trackingRepository.save(tracking);

    res.status(200).send({ data: updatedTracking });
  } catch (error) {
    res.status(404).send({ status: 'not_found' });
  }
};
