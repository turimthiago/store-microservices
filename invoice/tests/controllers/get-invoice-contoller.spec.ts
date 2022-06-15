import { getMockReq, getMockRes } from '@jest-mock/express';
import { GetInvoiceController } from '../../src/controllers';
import { GetInvoice } from '../../src/services';
import { Request, Response } from 'express';
import { mock, MockProxy } from 'jest-mock-extended';
import { DomainError } from '../../src/errors';

jest.mock('../../../libs/store-core');

describe('GetInvoiceController', () => {
    let req: Request;
    let res: Response;
    let getInvoice: MockProxy<GetInvoice>;
    let sut: GetInvoiceController;

    beforeAll(() => {
        req = getMockReq();
        res = getMockRes().res;
        getInvoice = mock();
        getInvoice.perform.mockResolvedValue([]);
    });

    beforeEach(() => {
        sut = new GetInvoiceController(getInvoice);
    });

    it('should returns 200 when success', async () => {
        await sut.handle(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should call GetInvoice with correct values', async () => {
        await sut.handle(req, res);
        expect(getInvoice.perform).toHaveBeenCalled();
    });

    it('should returns 400 when GetInvoice throws DomainError', async () => {
        getInvoice.perform.mockRejectedValueOnce(
            new DomainError('any_domain_error')
        );
        await sut.handle(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should returns 500 when GetInvoice throws Error', async () => {
        getInvoice.perform.mockRejectedValueOnce(new Error('any_error'));
        await sut.handle(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
    });
});
