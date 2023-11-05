import { Inject, Injectable } from '@nestjs/common';
import {
  CLIENT_FAVORITE_OFFERS,
  IClientFavoriteOffersRepository,
} from '../repositories/client-favorite-offers.repository';

@Injectable()
export class FindClientFavoriteOffer {
  constructor(
    @Inject(CLIENT_FAVORITE_OFFERS)
    private readonly clientfavoriteOffersRepository: IClientFavoriteOffersRepository,
  ) {}

  async execute(clientId: number): Promise<void> {
    await this.clientfavoriteOffersRepository.findByClientId(clientId);
  }
}
