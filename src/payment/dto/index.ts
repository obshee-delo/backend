import { IsJSON, IsNotEmpty, IsString } from "class-validator";
import { Receipt } from "../interfaces";


export class PaymentNewDto {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    courseName: string;

    @IsNotEmpty()
    @IsJSON()
    receipt: Receipt;
}
