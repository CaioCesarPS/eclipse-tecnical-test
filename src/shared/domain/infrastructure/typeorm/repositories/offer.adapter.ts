import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { OffersEntity } from '../entities/offer-entity';
import { Offer } from 'src/domain/entities/offer';
import { startOfDay, endOfDay } from 'date-fns';
import { CoinsToWalletEntity } from '../entities/coins-to-wallet';
import {
  ClientOfferRequest,
  OfferRepository,
} from 'src/domain/repositories/offer-repository';
import { Pagination } from 'src/shared/domain/utils/pagination';

export interface FindByClientIdResponse {
  offers: OffersEntity[];
  count: number;
}

const date = new Date();
const day = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();
const findDate = new Date(year, month, day);

@Injectable()
export class OfferAdapter implements OfferRepository {
  constructor(
    @InjectRepository(OffersEntity)
    private readonly offerRepository: Repository<OffersEntity>,
    @InjectRepository(CoinsToWalletEntity)
    private readonly coinToWalletRepository: Repository<CoinsToWalletEntity>,
  ) {}

  async create(offer: Offer): Promise<void> {
    const createOffer = { ...offer };
    await this.offerRepository.save(createOffer);
  }

  async findByClientId(id: number): Promise<FindByClientIdResponse> {
    const [offers, count] = await this.offerRepository.findAndCount({
      where: {
        clientId: id,
        createdAt: Between(startOfDay(findDate), endOfDay(findDate)),
      },
    });

    return { offers, count };
  }

  async findByToday(page: number): Promise<Pagination<OffersEntity[]>> {
    const limit = 10;
    const offers = await this.offerRepository.find({
      where: {
        active: true,
        createdAt: Between(startOfDay(findDate), endOfDay(findDate)),
      },
      skip: (page - 1) * limit,
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      data: offers,
      limit,
      page,
    };
  }

  async findById(id: number): Promise<OffersEntity> {
    const offer = await this.offerRepository.findOne({
      where: {
        id,
        active: true,
      },
    });

    return offer;
  }

  async delete({
    offerId,
    coinId,
    walletId,
  }: ClientOfferRequest): Promise<void> {
    const offer = await this.offerRepository.findOne({
      where: {
        id: offerId,
        active: true,
      },
    });

    if (!offer) {
      throw new Error('Offer not found');
    }

    const coinToWallet = await this.coinToWalletRepository.findOne({
      where: {
        coinId: coinId,
        walletId: walletId,
      },
    });

    const returnCoinToWallet = coinToWallet.balance + offer.value;
    await this.coinToWalletRepository.update(coinToWallet.id, {
      balance: returnCoinToWallet,
    });

    await this.offerRepository.update(
      {
        id: offerId,
      },
      {
        active: false,
      },
    );
  }
}
