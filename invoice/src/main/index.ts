import { app } from './config/app';
import { env } from './env';

app.listen(env.port, () =>
    console.log(`[invoice-api] running at http://localhost:${env.port}`)
);
