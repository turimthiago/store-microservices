import { Router } from 'express';
import { register } from 'prom-client';

export default (router: Router): void => {
    router.get('/health', async (req, res) => {
        return res.end(await register.metrics());
    });
};
