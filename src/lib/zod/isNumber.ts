import { z } from 'zod';

export const isNumber = z
  .string()
  .transform((val) => parseInt(val, 10))
  .refine((val) => !isNaN(val), { message: 'Invalid number' });
