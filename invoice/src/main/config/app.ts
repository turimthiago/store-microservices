import { setupConsumers } from './consumers';
import { rabbit } from './rabbit';
import { mongooseConnection } from './db-connection';
import { invoiceRepository } from './repository';
import { setupRoutes } from './routes';


import cors from 'cors';
import express, { json } from 'express';

rabbit.connect();
mongooseConnection.connect();

const app = express();
app.use(cors());
app.use(json());
app.use((req, res, next) => {
    res.type('json');
    next();
});
setupRoutes(app);
setupConsumers(rabbit, invoiceRepository);

export { app };
