import { Router, Express } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';

export const setupRoutes = (app: Express): void => {
    const router = Router();
    readdirSync(join(__dirname, '../routes'))
        .filter((fileName) => !fileName.endsWith('.map'))
        .map(async (fileName) => {
            (await import(`../routes/${fileName}`)).default(router);
        });
    app.use('/api', router);
};
