import { GenerateInvoice } from '../../src/services';
import {
    FindStockProduct,
    SaveInvoiceRepository
} from '../../src/repositories';
import { Invoice, InvoiceItem } from '../../src/models';
import { ProductStockNotFound } from '../../src/errors';

import { MockProxy, mock } from 'jest-mock-extended';

jest.mock('../../../libs/store-core');

describe('GenerateInvoice', () => {
    let currentDate: Date;
    let code: string;
    let orderCode: string;
    let items: InvoiceItem[];
    let invoiceRepostory: MockProxy<SaveInvoiceRepository>;
    let stockRepostory: MockProxy<FindStockProduct>;
    let sut: GenerateInvoice;

    beforeAll(() => {
        currentDate = new Date();
        jest.useFakeTimers().setSystemTime(currentDate.getTime());
        code = '0001';
        orderCode = '123';
        items = [
            {
                quantity: 10,
                product: 'Product 1',
                code
            }
        ];
        invoiceRepostory = mock();
        stockRepostory = mock();
        stockRepostory.findProduct.mockResolvedValue(items[0]);
    });

    beforeEach(() => {
        sut = new GenerateInvoice(invoiceRepostory, stockRepostory);
    });

    it('should call SaveInvoiceRepository with correct values', async () => {
        await sut.perform({ orderCode, items });
        expect(invoiceRepostory.save).toHaveBeenCalledWith({
            dtCreated: currentDate,
            orderCode,
            items
        });
    });

    it('should call FindStockProduct with correct values', async () => {
        await sut.perform({ orderCode, items });
        expect(stockRepostory.findProduct).toHaveBeenCalledTimes(1);
        expect(stockRepostory.findProduct).toHaveBeenCalledWith({
            code
        });
    });

    it('should save an invoice', async () => {
        const promise = sut.perform({ orderCode, items });
        await expect(promise).resolves.not.toThrow();
        expect(invoiceRepostory.save).toHaveBeenCalled();
        expect(invoiceRepostory.save).toHaveBeenCalledWith(expect.any(Invoice));
    });

    it('should throw ProductStockNotFound if product stock not found', async () => {
        stockRepostory.findProduct.mockResolvedValueOnce(undefined);
        const promise = sut.perform({ orderCode, items });
        await expect(promise).rejects.toThrow(ProductStockNotFound);
    });

    it('should throw if FindStockProduct throws', async () => {
        stockRepostory.findProduct.mockRejectedValueOnce(
            new Error('any_error')
        );
        const promise = sut.perform({ orderCode, items });
        await expect(promise).rejects.toThrow();
    });

    it('should throw if SaveInvoiceRepository throws', async () => {
        invoiceRepostory.save.mockRejectedValueOnce(new Error('any_error'));
        const promise = sut.perform({ orderCode, items });
        await expect(promise).rejects.toThrow();
    });
});
