export const env = {
    port: process.env.API_PORT || 3030,
    exchange: {
        sale: {
            name: 'store.sale'
        }
    },
    stockApi: {
        url: process.env.STOCK_API || 'http://stock:3050'
    },
    rabbitMq: {
        port: process.env.RABBITMQ_PORT || 5672,
        host: process.env.RABBITMQ_HOST || 'rabbitmq',
        user: process.env.RABBITMQ_USER || 'admin',
        password: process.env.RABBITMQ_PASSWORD || 'admin'
    }
};
