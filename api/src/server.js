import build from './app.js';

const server = build({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
    },
  },
});

server.listen({
  port: 5000,
  host: '::',
}, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
