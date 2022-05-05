export const env = {
    port: process.env.API_PORT,
    exchange: {
        sale: {
            name: 'store.sale'
        }
    },
    rabbitMq: {
        port: process.env.RABBITMQ_PORT,
        host: process.env.RABBITMQ_HOST,
        user: process.env.RABBITMQ_USER,
        password: process.env.RABBITMQ_PASSWORD
    }
};
