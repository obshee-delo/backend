import { IsNotEmpty, IsString } from "class-validator";


export class CourseFindByCategoryDto {
    @IsNotEmpty()
    @IsString()
    category: string;
}
