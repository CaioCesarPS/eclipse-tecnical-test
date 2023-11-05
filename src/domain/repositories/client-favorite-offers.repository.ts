import { Pagination } from 'src/shared/domain/utils/pagination';
import { ClientFavoriteOffersEntity } from '../../shared/domain/infrastructure/typeorm/entities/client-favorite-offers-entity';

export const CLIENT_FAVORITE_OFFERS = 'CLIENT_FAVORITE_OFFERS';

export interface ClientFavoriteOffersRepository {
  findByClientId(
    clientId: number,
    page: number,
  ): Promise<Pagination<ClientFavoriteOffersEntity[]>>;
  addFavoriteOffer(clientId: number, offerId: number): Promise<void>;
}
