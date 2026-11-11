/**
 * Background worker process shell. Queue processing (BullMQ on Redis) arrives with issue #3,
 * and reply-guarantee jobs with issue #11. Until then it only manages its own lifecycle.
 */

export interface Logger {
  info(message: string): void;
}

export interface Worker {
  readonly running: boolean;
  start(): void;
  stop(): Promise<void>;
}

export function createWorker(name: string, logger: Logger = console): Worker {
  let running = false;

  return {
    get running() {
      return running;
    },
    start() {
      if (running) return;
      running = true;
      logger.info(`${name} started`);
    },
    async stop() {
      if (!running) return;
      running = false;
      logger.info(`${name} stopped`);
    },
  };
}
