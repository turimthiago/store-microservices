import { Request, Response } from 'express';
import { Logger } from '../../../libs/store-core';
import { DomainError, ProductNotFoundError } from '../errors';
import { GetProductByCode } from '../services';

export class GetProductByCodeController {
    constructor(private readonly getProdutByCode: GetProductByCode) {}

    async handle(req: Request, res: Response): Promise<Response> {
        Logger.info(`[GetProductByCodeController] ${req.params.code}`);
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
            if (error instanceof ProductNotFoundError) {
                return res.status(404).json(error.message);
            }
            if (error instanceof DomainError) {
                return res.status(400).json(`Domain error ${error.message}`);
            }
            return res.status(500).json('Internal server error');
        }
    }
}
