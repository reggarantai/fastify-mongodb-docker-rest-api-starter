import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyStatic from '@fastify/static';
import mongoose from 'mongoose';
import {
  userRoutes,
} from './routes/index.js';

function build(options = {}) {
  const app = fastify(options);

  // Set up the JWT
  app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET, // Replace with your secret key
  });

  // Connect to MongoDB
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

  // Add user routes
  userRoutes.forEach((route) => app.route(route));

  // Landing page
  app.register(fastifyStatic, {
    root: '/usr/app/src/static',
  });
  app.get('/', (req, reply) => {
    reply.sendFile('index.html');
  });

  return app;
}

export default build;
