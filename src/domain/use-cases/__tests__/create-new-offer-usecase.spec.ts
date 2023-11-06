import { BadRequestException } from '@nestjs/common';
import { CreateNewOfferUseCase } from '../create-new-offer.usecase';
import {
  clientRepository,
  coinRepository,
  coinsToWalletRepository,
  makeClient,
  makeCoin,
  makeCoinsToWallet,
  makeOffer,
  makeWallet,
  offerRepository,
  walletRepository,
} from './mocks/mock.repository';

describe('Add Client Favorite Offer Use Case', () => {
  const adapter = new CreateNewOfferUseCase(
    clientRepository,
    walletRepository,
    offerRepository,
    coinRepository,
    coinsToWalletRepository,
  );

  it('should create a new offer', async () => {
    clientRepository.findById.mockReturnValue(makeClient(1, 'CaioCPS'));
    coinRepository.findById.mockReturnValue([
      makeCoin(1, 'BTC'),
      makeCoin(2, 'ETH'),
    ]);
    walletRepository.findByClientId.mockReturnValue([
      makeWallet(1, 1, 1),
      makeWallet(2, 1, 1),
    ]);

    coinsToWalletRepository.findByCoinId.mockReturnValue(
      makeCoinsToWallet(1, 1, 1, 100),
    );
    offerRepository.findByClientId.mockReturnValue({
      offers: [],
      count: 0,
    });
    expect(
      adapter.execute({
        clientId: 1,
        coinId: 1,
        quantityOfCoins: 10,
        walletId: 1,
      }),
    ).resolves;
  });

  it('should throw a error if client created more than 5 offers in the same day', async () => {
    clientRepository.findById.mockReturnValue(makeClient(1, 'CaioCPS'));
    coinRepository.findById.mockReturnValue([
      makeCoin(1, 'BTC'),
      makeCoin(2, 'ETH'),
    ]);
    walletRepository.findByClientId.mockReturnValue([
      makeWallet(1, 1, 1),
      makeWallet(2, 1, 1),
    ]);

    coinsToWalletRepository.findByCoinId.mockReturnValue(
      makeCoinsToWallet(1, 1, 1, 100),
    );
    offerRepository.findByClientId.mockReturnValue({
      offers: [
        makeOffer(1, 1, 'BTC', 10, 1000),
        makeOffer(2, 1, 'BTC', 10, 1000),
        makeOffer(3, 1, 'BTC', 10, 1000),
        makeOffer(4, 1, 'BTC', 10, 1000),
        makeOffer(5, 1, 'BTC', 10, 1000),
      ],
      count: 5,
    });

    expect(
      adapter.execute({
        clientId: 1,
        coinId: 1,
        quantityOfCoins: 10,
        walletId: 1,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should throw a error if client does not have enough coins to make a offer', async () => {
    clientRepository.findById.mockReturnValue(makeClient(1, 'CaioCPS'));
    coinRepository.findById.mockReturnValue([
      makeCoin(1, 'BTC'),
      makeCoin(2, 'ETH'),
    ]);
    walletRepository.findByClientId.mockReturnValue([
      makeWallet(1, 1, 1),
      makeWallet(2, 1, 1),
    ]);

    coinsToWalletRepository.findByCoinId.mockReturnValue(
      makeCoinsToWallet(1, 1, 1, 100),
    );
    offerRepository.findByClientId.mockReturnValue({
      offers: [makeOffer(1, 1, 'BTC', 10, 1000)],
      count: 1,
    });

    expect(
      adapter.execute({
        clientId: 1,
        coinId: 1,
        quantityOfCoins: 101,
        walletId: 1,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
