import { Request, Response } from 'express';
import axios from 'axios';
import { rateLimiter } from '../utils/rateLimiter';
import redisClient from '../redis/connection';

export const getGitHubUserCount = async (req: Request, res: Response): Promise<void> => {
  const country = req.query.country as string;
  if (!country) {
    res.status(400).json({ message: 'Country is required' });
    return;
  }

  try {
    await rateLimiter.consume(req.ip as string);

    // Check if the data is in cache
    const cacheKey = `github_user_count:${country}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      res.json(JSON.parse(cachedData));
      return;
    }

    const response = await axios.get(
      `https://api.github.com/search/users?q=location:${encodeURIComponent(country)}`,
      {
        headers: {
          'User-Agent': 'GitHub-User-Map-App',
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
        params: {
          per_page: 1,
        },
      }
    );

    const result = { country, total_count: response.data.total_count };

    // Cache the result for 1 hour
    await redisClient.set(cacheKey, JSON.stringify(result), 'EX', 60);

    res.json(result);
  } catch (error: any) {
    if (error.response && error.response.status === 403) {
      res.status(403).json({ message: 'GitHub API rate limit exceeded' });
      return;
    }
    res.status(500).json({ message: 'Error fetching data from GitHub API' });
  }
};
