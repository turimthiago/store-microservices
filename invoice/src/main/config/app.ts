import cors from 'cors';
import express, { json } from 'express';
import { setupConsumers } from './consumers';
import { rabbit } from './rabbit';
import { setupRoutes } from './routes';

rabbit
    .start()
    .then(() => {
        setupConsumers(rabbit);
    })
    .catch((err) => console.log(err));
const app = express();
app.use(cors());
app.use(json());
app.use((req, res, next) => {
    res.type('json');
    next();
});
setupRoutes(app);

export { app };
