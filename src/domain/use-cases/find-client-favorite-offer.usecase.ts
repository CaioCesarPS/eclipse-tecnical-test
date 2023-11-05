import { Inject, Injectable } from '@nestjs/common';
import {
  CLIENT_FAVORITE_OFFERS,
  ClientFavoriteOffersRepository,
} from '../repositories/client-favorite-offers.repository';
import { Pagination } from 'src/shared/domain/utils/pagination';
import { ClientFavoriteOffersEntity } from 'src/shared/domain/infrastructure/typeorm/entities/client-favorite-offers-entity';

@Injectable()
export class FindClientFavoriteOffer {
  constructor(
    @Inject(CLIENT_FAVORITE_OFFERS)
    private readonly clientfavoriteOffersRepository: ClientFavoriteOffersRepository,
  ) {}

  async execute(
    clientId: number,
    page: number,
  ): Promise<Pagination<ClientFavoriteOffersEntity[]>> {
    return await this.clientfavoriteOffersRepository.findByClientId(
      clientId,
      page,
    );
  }
}
