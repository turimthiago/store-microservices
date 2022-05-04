export class DomainError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DomainError';
    }
}

export class ProductStockNotFound extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ProductStockNotFound';
    }
}
