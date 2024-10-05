import { Request, Response } from 'express';
import axios from 'axios';
import { rateLimiter } from '../utils/rateLimiter';

export const getGitHubUserCount = async (req: Request, res: Response): Promise<void> => {
    const country = req.query.country as string;
    if (!country) {
        res.status(400).json({ message: 'Country is required' });
        return;
    }

    try {
        // Rate Limiting
        await rateLimiter.consume(req.ip as string);

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

        res.json({ country, total_count: response.data.total_count });
    } catch (error: any) {
        if (error.response && error.response.status === 403) {
            res.status(403).json({ message: 'GitHub API rate limit exceeded' });
            return;
        }
        res.status(500).json({ message: 'Error fetching data from GitHub API' });
    }
};
