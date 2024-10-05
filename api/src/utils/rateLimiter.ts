import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 100, // Number of points
  duration: 3600, // Per hour
});

export { rateLimiter };
