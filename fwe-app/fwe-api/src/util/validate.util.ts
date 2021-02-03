import { validate, ValidationError } from 'class-validator';
import { Label } from '../entity/label.entity';
import { Task } from '../entity/task.entity';
import { Tracking } from '../entity/tracking.entity';

/**
 * Helper to validate an entity.
 * @param entity The entity to validate.
 */
export const validateEntity = async (entity: Label | Task | Tracking) => {
  const errors: ValidationError[] = await validate(entity);
  // Check if there were errors
  if (errors.length > 0) {
    throw errors;
  }
};
