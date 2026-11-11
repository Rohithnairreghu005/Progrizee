import { describe, expect, it } from 'vitest';
import { healthStatusSchema } from './health';

describe('healthStatusSchema', () => {
  it('accepts a valid health payload', () => {
    expect(healthStatusSchema.parse({ status: 'ok', service: 'api' })).toEqual({
      status: 'ok',
      service: 'api',
    });
  });

  it('rejects an unknown status', () => {
    expect(healthStatusSchema.safeParse({ status: 'down', service: 'api' }).success).toBe(false);
  });

  it('rejects an empty service name', () => {
    expect(healthStatusSchema.safeParse({ status: 'ok', service: '' }).success).toBe(false);
  });
});
