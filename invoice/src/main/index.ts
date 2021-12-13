/*import { addAlias } from 'module-alias';
import { resolve } from 'path';

addAlias(
    'core-store',
    resolve(
        process.env.TS_NODE_DEV === undefined
            ? '../core-store/src/index.js'
            : 'src'
    )
);
*/
import { rabbit } from './config/rabbit';
import { SaleConsumer } from '../infra/consumers/sale-consumer';
import { GenerateInvoice } from '../services/generate-billing';

rabbit.start().then(() => {
    console.log(`[invoice app] started`);
    new SaleConsumer(new GenerateInvoice(), rabbit).start();
});
