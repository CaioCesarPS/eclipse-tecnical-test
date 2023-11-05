import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteOfferDTO {
  @IsNumber()
  @IsNotEmpty()
  offerId: number;

  @IsNumber()
  @IsNotEmpty()
  clientId: number;

  @IsNumber()
  @IsNotEmpty()
  coinId: number;
}
