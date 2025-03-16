import { z } from 'zod';

export const envVars = z.object({
  SECRET: z.string(),
});
