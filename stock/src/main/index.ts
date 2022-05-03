import 'dotenv/config';
import { env } from './config/env';
import { app } from './config/app';
import { Logger } from '../../../libs/store-core';

app.listen(env.port, () =>
    Logger.info(`[stock-api] running at http://localhost:${env.port}`)
);
