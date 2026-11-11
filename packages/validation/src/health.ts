import type { HealthStatus } from '@heard/types';
import { z } from 'zod';

export const healthStatusSchema = z.object({
  status: z.literal('ok'),
  service: z.string().min(1),
}) satisfies z.ZodType<HealthStatus>;
