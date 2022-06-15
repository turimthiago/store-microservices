import { Logger } from '../../../libs/store-core/dist';
import { GetOrders } from '../services';
import { Response, Request } from 'express';

export class GetOrderController {
    constructor(private readonly getOrder: GetOrders) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            Logger.info(
                `[GetOrderController] data ${JSON.stringify(req.body)}`
            );
            const orders = await this.getOrder.perform();
            return res.status(200).json(orders);
        } catch (error) {
            if (error instanceof Error) Logger.error(error.message);
            return res.status(500).json({ message: 'Deu ruim' });
        }
    }
}
