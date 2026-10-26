import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsInt,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class TicketDto {
  @IsString()
  film: string;

  @IsString()
  session: string;

  @IsString()
  daytime: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  row: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  seat: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  price: number;
}

export class CreateOrderDto {
  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TicketDto)
  tickets: TicketDto[];
}
