# Fastify-MongoDB-Docker REST API Starter

A starter for building a RESTful API using Fastify, MongoDB, Nginx, and Mongoose in a Docker container. It aims to provide a solid foundation for developing scalable and efficient API services with the added benefit of Nginx as a reverse proxy.

## Features

- Fastify: A highly efficient and low overhead web framework for Node.js.
- MongoDB: A popular NoSQL database for storing and retrieving data.
- Nginx: A high-performance web server and reverse proxy server.
- Docker: Containerization technology for easy deployment and scalability.
- Docker Compose: Simplified orchestration and management of Docker containers.
- JWT Authentication: Implementation of JSON Web Tokens for secure API authentication.

## Prerequisites

Make sure you have the [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed on your local machine

## Getting Started

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/reggarantai/fastify-mongodb-docker-rest-api-starter.git
   ```

2. Navigate to the project directory:
   ```sh
   cd fastify-mongodb-docker-rest-api-starter
   ```

3. Start the MongoDB database and API server using Docker Compose:
   ```sh
   docker compose up
   ```
   This command will spin up a MongoDB container, an Nginx container acting as a reverse proxy, and the Fastify API server container. The API server will be accessible at http://localhost:3333.

4. Open your favorite API testing tool (e.g., Postman) and start making requests to the API endpoints.

Happy coding! Hope this can be a starting point to build your awesome projects.