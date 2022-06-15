import { Logger } from '../../../libs/store-core';
import { CreateOrder } from '../services';
import { Response, Request } from 'express';

export class CreateOrderController {
    constructor(private readonly createOrder: CreateOrder) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            Logger.info(
                `[CreateOrderController] data ${JSON.stringify(req.body)}`
            );
            const { items } = req.body;
            await this.createOrder.perform({ items });
            return res.status(201).json({});
        } catch (error) {
            if (error instanceof Error) Logger.error(error.message);
            return res.status(500).json({ message: 'Deu ruim' });
        }
    }
}
