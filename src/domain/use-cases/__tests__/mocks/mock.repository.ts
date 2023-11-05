import { ClientsEntity } from '../../../../shared/domain/infrastructure/typeorm/entities/client-entity';
import { OffersEntity } from '../../../../shared/domain/infrastructure/typeorm/entities/offer-entity';

export const makeClient = (id: number, name: string) => {
  const clientEntity = new ClientsEntity();
  clientEntity.id = id;
  clientEntity.name = name;
  clientEntity.email = 'any_email';
  clientEntity.createdAt = new Date();
  return clientEntity;
};

export const makeWallet = (id: number, coinId: number, clientId: number) => {
  return {
    id,
    coinId,
    clientId,
    createdAt: new Date(),
  };
};

export const makeCoin = (id: number, name: string) => {
  return {
    id,
    name,
    createdAt: new Date(),
  };
};

export const makeOffer = (
  id: number,
  clientId: number,
  coinName: string,
  coinQuantity: number,
  totalOfferValue: number,
) => {
  const offers = new OffersEntity();
  offers.id = id;
  offers.clientId = clientId;
  offers.coinName = coinName;
  offers.coinQuantity = coinQuantity;
  offers.totalOfferValue = totalOfferValue;
  offers.active = true;
  offers.createdAt = new Date();
  return offers;
};

export const makeCoinsToWallet = (
  id: number,
  coinId: number,
  walletId: number,
  coinQuantity: number,
) => {
  return {
    id,
    coinId,
    walletId,
    coinQuantity,
    createdAt: new Date(),
  };
};

export const clientRepository = {
  findById: jest.fn(),
  findByClientId: jest.fn(),
};

export const walletRepository = {
  findByClientId: jest.fn(),
};

export const offerRepository = {
  findByClientId: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
  findByToday: jest.fn(),
  delete: jest.fn(),
};

export const coinRepository = {
  findById: jest.fn(),
  update: jest.fn(),
};

export const coinsToWalletRepository = {
  findByCoinId: jest.fn(),
  update: jest.fn(),
};

export const clientFavoriteOffersRepository = {
  findByClientId: jest.fn(),
  addFavoriteOffer: jest.fn(),
};
