import { Logger } from '../../../libs/store-core';
import { app } from './config/app';
import { env } from './env';

app.listen(env.port, () =>
    Logger.info(`[invoice-api] running at http://localhost:${env.port}`)
);
