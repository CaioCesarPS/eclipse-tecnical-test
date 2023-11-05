import { ClientFavoriteOffersEntity } from '../../shared/domain/infrastructure/typeorm/entities/client-favorite-offers-entity';

export const CLIENT_FAVORITE_OFFERS = 'CLIENT_FAVORITE_OFFERS';

export interface IClientFavoriteOffersRepository {
  findByClientId(clientId: number): Promise<ClientFavoriteOffersEntity>;
  addFavoriteOffer(clientId: number, offerId: number): Promise<void>;
}
