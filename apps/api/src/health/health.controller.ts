import { Controller, Get } from '@nestjs/common';
import type { HealthStatus } from '@heard/types';

/** Liveness probe. Readiness (database, Redis) checks arrive with issue #3. */
@Controller('health')
export class HealthController {
  @Get()
  check(): HealthStatus {
    return { status: 'ok', service: 'api' };
  }
}
