import { Request, Response } from 'express';
import { Logger } from '../../../libs/store-core';
import { DomainError } from '../errors';
import { GetInvoice } from '../services';

export class GetInvoiceController {
    constructor(private readonly getInvoice: GetInvoice) {}

    async handle(req: Request, res: Response): Promise<Response> {
        Logger.info(`[GetInvoiceCodeController] ${req.params.code}`);
        try {
            const invoices = await this.getInvoice.perform();
            return res.status(200).json({ invoices });
        } catch (error) {
            if (error instanceof DomainError) {
                return res.status(400).json(`Domain error ${error.message}`);
            }
            return res.status(500).json('Internal server error');
        }
    }
}
