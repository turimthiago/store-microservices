import { model, Schema } from 'mongoose';

export interface InvoiceDocument extends Document {
    orderCode: string;
    dtCreated: Date;
    items: [
        {
            code: string;
            product: string;
            quantity: number;
        }
    ];
}
const InvoiceSchema = new Schema({
    orderCode: String,
    dtCreated: { type: Date, default: Date.now },
    items: [
        {
            code: String,
            product: String,
            quantity: Number
        }
    ]
});
export default model<InvoiceDocument>('Invoice', InvoiceSchema);
