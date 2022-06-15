import { ApiStockRepository } from '../../../src/infra/repositories';

import axios from 'axios';
import { DomainError } from '../../../src/errors';

jest.mock('axios');
jest.mock('../../../../libs/store-core');

export const range = (
    from: number,
    size: number,
    excludes: number[] = []
): number[] => {
    const result = Array.from(Array(size).keys()).map((v) => v + from);
    return result.filter((v) => !excludes.includes(v));
};

describe('ApiStockRepository', () => {
    let code: string;
    let quantity: number;
    let uri: string;
    let fakeAxios: jest.Mocked<typeof axios>;
    let sut: ApiStockRepository;

    beforeAll(() => {
        code = '1';
        quantity = 10;
        uri = 'any_url';
        fakeAxios = axios as jest.Mocked<typeof axios>;
        fakeAxios.get.mockResolvedValue({
            status: 200,
            data: { code, quantity }
        });
    });

    beforeEach(() => {
        sut = new ApiStockRepository(uri, fakeAxios);
    });

    it('should call axios with correct values', async () => {
        await sut.findProduct({ code });
        expect(axios.get).toHaveBeenCalledWith(`${uri}/api/products/${code}`);
    });

    it('should return StockItem', async () => {
        const stockItem = await sut.findProduct({ code });
        expect(stockItem).toBeTruthy();
    });

 /*   it.only.each(range(400, 99, [404]))(
        'should throw DocmainError if response equals %p',
        async (status) => {
            fakeAxios.get.mockResolvedValue({
                status,
                data: { error: 'any_error' }
            });
            const promise = sut.findProduct({ code });
            await expect(promise).rejects.toThrow(DomainError);
        }
    );*/

    it('should throw DomainError if status between 400 and 499', async () => {
        const intervalStatusCode = range(400, 99, [404]);
        for (const index in intervalStatusCode) {
            const status = intervalStatusCode[index];
            fakeAxios.get.mockResolvedValue({
                status,
                data: { error: 'any_error' }
            });
            const promise = sut.findProduct({ code });
            await expect(promise).rejects.toThrow(DomainError);
        }
    });
});
