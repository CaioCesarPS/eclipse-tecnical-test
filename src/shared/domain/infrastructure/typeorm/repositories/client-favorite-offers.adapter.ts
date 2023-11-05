import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IClientFavoriteOffersRepository } from 'src/domain/repositories/client-favorite-offers.repository';
import { ClientFavoriteOffersEntity } from '../entities/client-favorite-offers-entity';

@Injectable()
export class ClientFavoriteOffersAdapter
  implements IClientFavoriteOffersRepository
{
  constructor(
    @InjectRepository(ClientFavoriteOffersEntity)
    private readonly clientFavoriteOfferRepository: Repository<ClientFavoriteOffersEntity>,
  ) {}

  async findByClientId(clientId: number) {
    return await this.clientFavoriteOfferRepository.findOne({
      where: { id: clientId },
    });
  }

  async addFavoriteOffer(clientId: number, offerId: number): Promise<void> {
    const clientFavoriteOffer = {
      client_id: clientId,
      offer_id: offerId,
    };
    await this.clientFavoriteOfferRepository.save(clientFavoriteOffer);
  }
}
