export class GenerateInvoice {
    async perform(params: GenerateInvoice.Params): Promise<void> {}
}

export namespace GenerateInvoice {
    export type Params = {
        orderCode: string;
        quantity: number;
        product: string;
    };
}
