import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    display_name? : string
    @IsString()
    password: string
    @IsEmail()
    email: string
    @IsString()
    no_hp: string
}