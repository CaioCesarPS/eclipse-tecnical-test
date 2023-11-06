import { Inject, Injectable } from '@nestjs/common';
import {
  WALLET_REPOSITORY,
  WalletRepository,
} from '../repositories/wallet-repository';
import {
  OFFER_REPOSITORY,
  OfferRepository,
} from '../repositories/offer-repository';
import {
  COIN_REPOSITORY,
  CoinRepository,
} from '../repositories/coin-repository';
import {
  COINS_TO_WALLET_REPOSITORY,
  CoinsToWalletRepository,
} from '../repositories/coins-to-wallet-repository';

interface BuyOfferDTO {
  offerId: number;
  fromClient: {
    id: number;
    clientId: number;
    walletId: number;
    coinId: number;
    coinToWalletId: number;
  };
  toClient: {
    id: number;
    clientId: number;
    walletId: number;
    coinId: number;
    coinToWalletId: number;
  };
}

@Injectable()
export class BuyOfferUseCase {
  constructor(
    @Inject(WALLET_REPOSITORY)
    private readonly walletRepository: WalletRepository,
    @Inject(OFFER_REPOSITORY)
    private readonly offerRepository: OfferRepository,
    @Inject(COIN_REPOSITORY)
    private readonly coinRepository: CoinRepository,
    @Inject(COINS_TO_WALLET_REPOSITORY)
    private readonly coinsToWalletRepository: CoinsToWalletRepository,
  ) {}

  async execute({ fromClient, toClient, offerId }: BuyOfferDTO) {
    const offer = await this.offerRepository.findById(offerId);
    const BuyingCoins = await this.coinsToWalletRepository.findById(
      toClient.coinToWalletId,
    );
    const fromWallet = await this.walletRepository.findByClientId(
      fromClient.clientId,
    );
    const toWallet = await this.walletRepository.findByClientId(
      toClient.clientId,
    );

    // Carteira de quem está comprando
    const findFromWallet = fromWallet.find(
      (wallet) => wallet.id === fromClient.id,
    );

    // Carteira de quem está vendendo
    const findToWallet = toWallet.find((wallet) => wallet.id === toClient.id);

    findFromWallet.validateBuyOperation(offer.totalOfferValue);
    findFromWallet.removeBalanceToWallet(offer.totalOfferValue);
    findToWallet.addBalanceToWallet(offer.totalOfferValue);

    // Atualiza quantidade de coins na carteira de quem está comprando
    BuyingCoins.addCoinsToWallet(offer.coinQuantity);

    // Atualiza a carteira de quem está comprando
    await this.walletRepository.update(findFromWallet);
    await this.walletRepository.update(findToWallet);

    // Atualiza a carteira de quem está vendendo
    await this.coinsToWalletRepository.update(BuyingCoins);

    offer.active = false;
    await this.offerRepository.update(offer);
  }
}
