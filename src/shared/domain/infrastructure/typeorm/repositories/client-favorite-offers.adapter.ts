import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ClientFavoriteOffersRepository } from 'src/domain/repositories/client-favorite-offers.repository';
import { ClientFavoriteOffersEntity } from '../entities/client-favorite-offers-entity';

@Injectable()
export class ClientFavoriteOffersAdapter
  implements ClientFavoriteOffersRepository
{
  constructor(
    @InjectRepository(ClientFavoriteOffersEntity)
    private readonly clientFavoriteOfferRepository: Repository<ClientFavoriteOffersEntity>,
  ) {}

  async findByClientId(clientId: number, page: number = 1) {
    const limit = 10;

    const favoriteOffers = await this.clientFavoriteOfferRepository.find({
      where: { client_id: clientId, active: true },
      skip: (page - 1) * limit,
      order: {
        created_at: 'DESC',
      },
    });

    return {
      data: favoriteOffers,
      limit,
      page,
    };
  }

  async addFavoriteOffer(clientId: number, offerId: number): Promise<void> {
    const clientFavoriteOffer = {
      client_id: clientId,
      offer_id: offerId,
    };
    await this.clientFavoriteOfferRepository.save(clientFavoriteOffer);
  }
}
