import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

// Connect to Redis using the provided host and port from environment variables.
const redisClient = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  password: process.env.REDIS_PASSWORD || undefined,
});

redisClient.on('error', (err: any) => {
  console.error('Redis error:', err);
});

export default redisClient;
