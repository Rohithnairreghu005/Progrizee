import { createWorker } from './worker';

const worker = createWorker(process.env.WORKER_NAME ?? 'heard-worker');
worker.start();

// Keep the process alive until a shutdown signal arrives.
const keepAlive = setInterval(() => {}, 60_000);

async function shutdown(signal: NodeJS.Signals): Promise<void> {
  console.info(`received ${signal}, shutting down`);
  clearInterval(keepAlive);
  await worker.stop();
  process.exit(0);
}

process.once('SIGTERM', (signal) => void shutdown(signal));
process.once('SIGINT', (signal) => void shutdown(signal));
