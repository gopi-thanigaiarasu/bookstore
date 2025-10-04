import Fastify from "fastify";
import cors from "@fastify/cors";
import { config } from "./config/env";
import { connectDatabase, disconnectDatabase } from "./config/database";
import { authorRoutes } from "./routes/author.routes";
import { bookRoutes } from "./routes/book.routes";
import { AppError } from "./utils/errors";

const fastify = Fastify({
  logger: config.nodeEnv === "development",
});

// Register CORS
fastify.register(cors, {
  origin: true,
  credentials: true,
});

// Health check
fastify.get("/health", async () => {
  return { status: "ok", timestamp: new Date().toISOString() };
});

// Register routes
fastify.register(
  async (instance) => {
    await authorRoutes(instance);
    await bookRoutes(instance);
  },
  { prefix: "/api" }
);

// Global error handler
fastify.setErrorHandler((error, request, reply) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      error: error.name,
      message: error.message,
    });
  }

  // Prisma errors
  if (error.name === "PrismaClientKnownRequestError") {
    return reply.status(400).send({
      statusCode: 400,
      error: "Database Error",
      message: "Invalid request to database",
    });
  }

  // Log unexpected errors
  fastify.log.error(error);

  return reply.status(500).send({
    statusCode: 500,
    error: "Internal Server Error",
    message:
      config.nodeEnv === "development" ? error.message : "Something went wrong",
  });
});

// 404 handler
fastify.setNotFoundHandler((request, reply) => {
  reply.status(404).send({
    statusCode: 404,
    error: "Not Found",
    message: `Route ${request.method}:${request.url} not found`,
  });
});

// Start server
async function start() {
  try {
    await connectDatabase();

    await fastify.listen({
      port: config.port,
      host: config.host,
    });
    console.log(`Server running on http://${config.host}:${config.port}`);
    console.log(`API available at http://${config.host}:${config.port}/api`);
  } catch (error) {
    fastify.log.error(error);
    await disconnectDatabase();
    process.exit(1);
  }
}

// Graceful shutdown
const signals = ["SIGINT", "SIGTERM"];
signals.forEach((signal) => {
  process.on(signal, async () => {
    console.log(`\n${signal} received, shutting down gracefully...`);
    await fastify.close();
    await disconnectDatabase();
    process.exit(0);
  });
});

start();
