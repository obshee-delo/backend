import { IntoStringArray } from "@backend/common/transformers";
import { Transform } from "class-transformer";
import { IsArray, IsNotEmpty, IsString } from "class-validator";


export class ClientRefreshDto {
    @IsNotEmpty()
    @IsString()
    id: string
}

export class ClientSignUpDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsArray()
    permissions: string[];
}
