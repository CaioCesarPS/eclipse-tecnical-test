import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Offer } from '../entities/offer';
import {
  CLIENT_REPOSITORY,
  ClientRepository,
} from '../repositories/client-repository';
import {
  COIN_REPOSITORY,
  CoinRepository,
} from '../repositories/coin-repository';
import {
  OfferRepository,
  OFFER_REPOSITORY,
} from '../repositories/offer-repository';
import {
  WalletRepository,
  WALLET_REPOSITORY,
} from '../repositories/wallet-repository';
import { CreateOfferDTO } from 'src/application/input/create-offer.dto';
import {
  COINS_TO_WALLET_REPOSITORY,
  CoinsToWalletRepository,
} from '../repositories/coins-to-wallet-repository';

@Injectable()
export class CreateNewOfferUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: ClientRepository,
    @Inject(WALLET_REPOSITORY)
    private readonly walletRepository: WalletRepository,
    @Inject(OFFER_REPOSITORY)
    private readonly offerRepository: OfferRepository,
    @Inject(COIN_REPOSITORY)
    private readonly coinRepository: CoinRepository,
    @Inject(COINS_TO_WALLET_REPOSITORY)
    private readonly coinsToWalletRepository: CoinsToWalletRepository,
  ) {}

  async execute({ clientId, coinId, value, walletId }: CreateOfferDTO) {
    const client = await this.clientRepository.findById(clientId);
    const coin = await this.coinRepository.findById(coinId);
    const wallet = await this.walletRepository.findByClientId(client.id);
    const coinToWalletBalance =
      await this.coinsToWalletRepository.findByCoinId(coinId);
    const offers = await this.offerRepository.findByClientId(client.id);

    if (offers.count >= 5) {
      throw new BadRequestException({
        message: 'You have reached the limit of offers per day',
      });
    }

    if (coinToWalletBalance.balance < value) {
      throw new BadRequestException({
        message: 'You do not have enough coins to make this offer',
      });
    }

    const offer = new Offer({
      clientId: client.toDomain().id,
      coinName: coin.find((coin) => coin.id === coinId).name,
      walletId: wallet.find((wallet) => walletId === wallet.id).id,
      giftCounterId: 1,
      value,
    });

    const newCoinBalance = coinToWalletBalance.balance - offer.value;

    const updatedCoinBalance = {
      id: coinToWalletBalance.id,
      coinId: coinToWalletBalance.coinId,
      walletId: coinToWalletBalance.walletId,
      balance: newCoinBalance,
    };

    offer.validateOffer(coinToWalletBalance.balance);

    await this.offerRepository.create(offer);
    await this.coinsToWalletRepository.update(updatedCoinBalance);
  }
}
