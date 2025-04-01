import { IsNumber } from 'class-validator';

export class DeductBalanceDto {
  @IsNumber()
  userId: number;
  @IsNumber()
  amount: number;
}
