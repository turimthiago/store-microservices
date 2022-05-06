export const env = {
    port: process.env.API_PORT || 3050,
    database: {
        url:
            process.env.DATABASE_URL ||
            'postgresql://postgres:admin@postgres:5432/stock'
    }
};
