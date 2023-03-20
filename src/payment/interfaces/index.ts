/**
 * Truncated version of the YooKassa API payment object.
 */
export interface Receipt {
    id: string,
    amount: number,
    createdAt: string,
    description: string
}

export interface PaymentNew {
    userId: string,
    courseName: string,
    receipt: Receipt
}
