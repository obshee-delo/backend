import { IntoStringArray } from "@backend/common/transformers";
import { Transform } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class UserLoginDto {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class UserRegisterDto {
    /**
     * To avoid bugs, use /user/signup method to create user.
     */
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    birthday: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    phoneNumber: string;
}

export class UserConfirmRegistrationDto {
    @IsNotEmpty()
    @IsString()
    emailVerificationCode: string;
}

export class UserResetPasswordDto {
    @IsNotEmpty()
    @IsString()
    email: string;
}

export class UserConfirmPasswordResetDto {
    @IsNotEmpty()
    @IsString()
    emailVerificationCode: string;
}

export class UserSetPasswordDto {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class UserRetryRegistrationVerificationDto {
    @IsNotEmpty()
    @IsString()
    id: string;
}

export class UserRetryPasswordResetVerificationDto {
    @IsNotEmpty()
    @IsString()
    id: string;
}

