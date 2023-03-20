import { IsJSON, IsNotEmpty, IsString } from "class-validator";
import { Receipt } from "../interfaces";


export class PaymentNewDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    courseName: string;

    @IsJSON()
    @IsNotEmpty()
    receipt: Receipt;
}
