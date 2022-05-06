export class DomainError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DomainError';
    }
}

export class ProductNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ProductNotFoundError';
    }
}

export class ProductBlockedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ProductBlockedError';
    }
}
