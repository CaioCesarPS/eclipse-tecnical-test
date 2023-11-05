import { Inject, Injectable } from '@nestjs/common';
import {
  CLIENT_FAVORITE_OFFERS,
  IClientFavoriteOffersRepository,
} from '../repositories/client-favorite-offers.repository';

@Injectable()
export class ClientFavoriteOfferUseCase {
  constructor(
    @Inject(CLIENT_FAVORITE_OFFERS)
    private readonly clientfavoriteOffersRepository: IClientFavoriteOffersRepository,
  ) {}

  async execute(offerId: number, clientId: number): Promise<void> {
    await this.clientfavoriteOffersRepository.addFavoriteOffer(
      clientId,
      offerId,
    );
  }
}
