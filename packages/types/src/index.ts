/**
 * Shared TypeScript types used across Heard apps.
 * Domain types arrive with the schema work in issue #5.
 */

export type HealthState = 'ok';

export interface HealthStatus {
  status: HealthState;
  service: string;
}
