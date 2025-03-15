import { z } from 'zod';

export const envVars = z.object({
  //DATABASE_URL: z.string(),
  SECRET: z.string(),
});

// eslint-disable-next-line no-undef
export type EnvVars = Env & z.infer<typeof envVars>;
