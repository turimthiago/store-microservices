import cors from 'cors';
import express, { json } from 'express';
import { rabbit } from './rabbit';
import { setupRoutes } from './routes';

rabbit.connect();
const app = express();
app.use(cors());
app.use(json());
app.use((req, res, next) => {
    res.type('json');
    next();
});
setupRoutes(app);

export { app };
