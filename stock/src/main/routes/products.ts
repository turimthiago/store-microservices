import { Router } from 'express';
import { makeGetControllerByCode } from '../factories/get-product-by-code-controller';

export default (router: Router): void => {
    const getProdutByCode = makeGetControllerByCode();
    router.get('/products/:code', async (req, res) =>
        getProdutByCode.handle(req, res)
    );
};
