import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(2)
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(7)
    @MaxLength(256)
    password: string;

    @IsString()
    phoneNumber: string;
}
