import { OffersEntity } from 'src/shared/domain/infrastructure/typeorm/entities/offer-entity';
import { Offer } from '../entities/offer';
import { Pagination } from 'src/shared/domain/utils/pagination';
import { FindByClientIdResponse } from 'src/shared/domain/infrastructure/typeorm/repositories/offer.adapter';

export const OFFER_REPOSITORY = 'OFFER_REPOSITORY';

export interface ClientOfferRequest {
  offerId: number;
  coinId: number;
  walletId: number;
}

export interface OfferRepository {
  findByClientId(id: number): Promise<FindByClientIdResponse>;
  findById(id: number): Promise<OffersEntity>;
  create(offer: Offer): Promise<void>;
  findByToday(page: number): Promise<Pagination<OffersEntity[]>>;
  delete({ offerId, coinId, walletId }: ClientOfferRequest): Promise<void>;
}
