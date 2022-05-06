import cors from 'cors';
import express, { json } from 'express';
import { database } from './database';
import { setupRoutes } from './routes';

const app = express();
app.use(cors());
app.use(json());
app.use((req, res, next) => {
    res.type('json');
    next();
});
database().catch((e) => console.log(e));
setupRoutes(app);

export { app };
