import axios from 'axios';
import Ajv, { stringify, ValidateFunction } from 'ajv';
import { ApiStockRepository } from '../../src/infra/repositories';

jest.mock('../../../libs/store-core');

const schema = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        code: { type: 'string' },
        quantity: { type: 'number' }
    },
    required: ['id', 'code', 'quantity'],
    additionalProperties: true
};

describe('stock-api', () => {
    let code: string;
    let validateSchema: ValidateFunction;

    beforeAll(() => {
        code = '111';
        validateSchema = new Ajv().compile(schema);
    });

    it('should find a product with valid json schema from stock-api', async () => {
        const uri = `${process.env.STOCK_API}/api/products/${code}`;
        const response = await axios.get(uri);
        validateSchema(response.data);
        expect(validateSchema.errors).toBeFalsy();
    });
});
