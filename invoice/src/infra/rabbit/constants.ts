type Exchange = {
    name: string;
    work?: Queue;
    retry?: Queue;
    fail?: Queue;
    dlq?: Queue;
};

type Queue = {
    name: string;
    routingKey: string;
};

export const sale: Exchange = {
    name: 'sale'
};

type RequiredQueues = Required<Exchange>;

export const invoiceSale: RequiredQueues = {
    name: 'invoice.sale',
    work: { name: 'invoice.sale.work', routingKey: '' },
    retry: { name: 'invoice.sale.retry', routingKey: 'retry' },
    fail: { name: 'invoice.sale.fail', routingKey: 'fail' },
    dlq: { name: 'invoice.sale.dlq', routingKey: 'dlq' }
};
