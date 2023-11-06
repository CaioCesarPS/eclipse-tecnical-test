import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOfferDTO {
  @IsNumber()
  @IsNotEmpty()
  clientId: number;

  @IsNumber()
  @IsNotEmpty()
  coinId: number;

  @IsNumber()
  @IsNotEmpty()
  walletId: number;

  @IsNumber()
  @IsNotEmpty()
  quantityOfCoins: number;
}
