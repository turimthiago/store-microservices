import { GenerateInvoice } from '../../src/services';
import { MockProxy, mock, any } from 'jest-mock-extended';
import {
    FindStockProduct,
    SaveInvoiceRepository
} from '../../src/repositories';
import { Invoice, InvoiceItem } from '../../src/models';
import { ProductStockNotFound } from '../../src/errors';

jest.mock('../../../libs/store-core');

describe('GenerateInvoice', () => {
    let currentDate: Date;
    let orderCode: string;
    let items: InvoiceItem[];
    let invoiceRepostory: MockProxy<SaveInvoiceRepository>;
    let stockRepostory: MockProxy<FindStockProduct>;
    let sut: GenerateInvoice;

    beforeAll(() => {
        currentDate = new Date();
        jest.useFakeTimers().setSystemTime(currentDate.getTime());
        orderCode = '123';
        items = [
            {
                quantity: 10,
                product: 'Product 1',
                code: '0001'
            }
        ];
        invoiceRepostory = mock();
        stockRepostory = mock();
        stockRepostory.findProduct.mockResolvedValue(items[0]);
    });

    beforeEach(() => {
        sut = new GenerateInvoice(invoiceRepostory, stockRepostory);
    });

    it('should save an invoice', async () => {
        const promise = sut.perform({ orderCode, items });
        await expect(promise).resolves.not.toThrow();
        expect(invoiceRepostory.save).toHaveBeenCalled();
        expect(invoiceRepostory.save).toHaveBeenCalledWith(expect.any(Invoice));
        expect(invoiceRepostory.save).toHaveBeenCalledWith(
            new Invoice({
                dtCreated: currentDate,
                orderCode,
                items,
                total: 19.9
            })
        );
    });

    it('should throw ProductStockNotFound if product stock not found', async () => {
        stockRepostory.findProduct.mockResolvedValueOnce(undefined);
        const promise = sut.perform({ orderCode, items });
        await expect(promise).rejects.toThrow(ProductStockNotFound);
    });
});
