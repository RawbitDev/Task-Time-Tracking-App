import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Label } from '../../entity/label.entity';
import { validateEntity } from '../../util/validate.util';

/**
 * Get a list of all labels.
 */
export const getLabels = async (_: Request, res: Response) => {
  const labelRepository: Repository<Label> = getRepository(Label);
  const labels: Label[] = await labelRepository.find({ relations: ['tasks'] });

  res.status(200).send({ data: labels });
};

/**
 * Create a new label.
 */
export const createLabel = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const label: Label = new Label();
    label.name = name;

    await validateEntity(label);
    const labelRepository: Repository<Label> = getRepository(Label);
    const createdLabel: Label = await labelRepository.save(label);

    res.status(201).send({ data: createdLabel });
  } catch (error) {
    res.status(400).send({ status: 'missing_parameter' });
  }
};

/**
 * Get a certain label by its id.
 */
export const getLabel = async (req: Request, res: Response) => {
  const labelId: string = req.params.labelId;

  try {
    const labelRepository: Repository<Label> = getRepository(Label);
    const label: Label = await labelRepository.findOneOrFail(labelId, { relations: ['tasks'] });

    res.status(200).send({ data: label });
  } catch (error) {
    res.status(404).send({ status: 'not_found' });
  }
};

/**
 * Delete a certain label by its id.
 */
export const deleteLabel = async (req: Request, res: Response) => {
  const labelId = req.params.labelId;

  try {
    const labelRepository: Repository<Label> = getRepository(Label);
    const label: Label = await labelRepository.findOneOrFail(labelId, { relations: ['tasks'] });
    await labelRepository.remove(label);

    res.status(204).send();
  } catch (error) {
    res.status(404).send({ status: 'not_found' });
  }
};

/**
 * Update a certain label by its id.
 */
export const patchLabel = async (req: Request, res: Response) => {
  const labelId: string = req.params.labelId;
  const { name } = req.body;

  try {
    const labelRepository: Repository<Label> = getRepository(Label);
    const label: Label = await labelRepository.findOneOrFail(labelId, { relations: ['tasks'] });
    // Don't update attributes with null or undefined
    label.name = name || label.name;

    await validateEntity(label);
    const updatedLabel = await labelRepository.save(label);

    res.status(200).send({ data: updatedLabel });
  } catch (error) {
    res.status(404).send({ status: 'not_found' });
  }
};
