import { IsNotEmpty, IsString } from "class-validator";


export class PaymentNewDto {
    @IsString()
    @IsNotEmpty()
    customerId: string;

    @IsString()
    @IsNotEmpty()
    courseId: string;

    @IsString()
    @IsNotEmpty()
    receiptUrl: string;

    @IsString()
    @IsNotEmpty()
    orderId: string;
}
