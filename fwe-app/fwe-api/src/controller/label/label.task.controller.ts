import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Label } from '../../entity/label.entity';

/**
 * Get a list of all tasks with the label.
 */
export const getLabelTasks = async (req: Request, res: Response) => {
  const labelId: string = req.params.labelId;

  try {
    const labelRepository: Repository<Label> = getRepository(Label);
    const label = await labelRepository.findOneOrFail(labelId, { relations: ['tasks'] });

    res.status(200).send({ data: label.tasks });
  } catch (error) {
    res.status(404).send({ status: 'not_found' });
  }
};
