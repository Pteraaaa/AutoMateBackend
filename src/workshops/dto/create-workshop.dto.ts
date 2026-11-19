import { ArrayMinSize, IsArray, IsNumber, IsString } from "class-validator";

export class CreateWorkshopDto {
    @IsString()
    name: string;

    @IsString()
    phoneNumber: string;

    @IsString()
    address: string;

    @IsNumber({ maxDecimalPlaces: 1})
    rating: number;

    @IsArray()
    @ArrayMinSize(1)
    @IsString()
    serviceTypes: string[];
}
