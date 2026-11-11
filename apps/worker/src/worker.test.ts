import { describe, expect, it, vi } from 'vitest';
import { createWorker } from './worker';

describe('createWorker', () => {
  it('starts and stops, logging each transition once', async () => {
    const logger = { info: vi.fn() };
    const worker = createWorker('test-worker', logger);

    worker.start();
    worker.start();
    expect(worker.running).toBe(true);

    await worker.stop();
    await worker.stop();
    expect(worker.running).toBe(false);

    expect(logger.info.mock.calls).toEqual([['test-worker started'], ['test-worker stopped']]);
  });
});
