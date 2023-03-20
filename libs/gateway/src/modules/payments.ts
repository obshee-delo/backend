import { ApiAdapter } from '../adapter';
import { CrudService } from '../service';
import { Response } from '../types';


export interface Receipt {
    id: string,
    amount: number,
    createdAt: string,
    description: string
}

export type Payment = {
    userId: string,
    courseName: string,
    receipt: Receipt
}

export type PaymentNewRequest = Payment;

export type PaymentNewResponse = Response<{}>;


export class PaymentService extends CrudService<Payment> {
    constructor(adapter: ApiAdapter) {
        super(adapter, 'payment');
    }

    public findByCategory(parameters: PaymentNewRequest): Promise<PaymentNewResponse> {
        return this.adapter.post<PaymentNewResponse>(`payment/new`, parameters);
    }
}
