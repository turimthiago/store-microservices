import { Request, Response } from 'express';
import { Logger } from '../../../libs/store-core';
import { GetProductByCode } from '../services';

export class GetProductByCodeController {
    constructor(private readonly getProdutByCode: GetProductByCode) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const code = req.params.code as string;
            Logger.info(`[GetProductByCodeController] code ${code}`);
            if (!code)
                return res
                    .status(404)
                    .json({ message: 'Product code is not found.' });
            const product = await this.getProdutByCode.perform({ code });
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json('Internal server error');
        }
    }
}
