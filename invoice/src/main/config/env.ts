export const env = {
    port: process.env.API_PORT || 3030,
    exchange: {
        sale: {
            name: 'store.sale'
        }
    },
    stockApi: {
        url: process.env.STOCK_API || ''
    },
    rabbitMq: {
        port: process.env.RABBITMQ_PORT,
        host: process.env.RABBITMQ_HOST,
        user: process.env.RABBITMQ_USER,
        password: process.env.RABBITMQ_PASSWORD
    }
};
