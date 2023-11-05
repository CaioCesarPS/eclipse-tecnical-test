import { ClientsEntity } from '../../../../shared/domain/infrastructure/typeorm/entities/client-entity';

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
  value: number,
) => {
  return {
    id,
    clientId,
    coinName,
    value,
    createdAt: new Date(),
  };
};

export const makeCoinsToWallet = (
  id: number,
  coinId: number,
  walletId: number,
  balance: number,
) => {
  return {
    id,
    coinId,
    walletId,
    balance,
    createdAt: new Date(),
  };
};

export const clientRepository = {
  findById: jest.fn(),
};

export const walletRepository = {
  findByClientId: jest.fn().mockImplementation((entity) => entity),
};

export const offerRepository = {
  findByClientId: jest.fn().mockImplementation((entity) => entity),
  create: jest.fn(),
  findById: jest.fn().mockImplementation((entity) => entity),
  findByToday: jest.fn().mockImplementation((entity) => entity),
  delete: jest.fn(),
};
export const coinRepository = {
  findById: jest.fn().mockImplementation((entity) => entity),
  update: jest.fn(),
};
export const coinsToWalletRepository = {
  findByCoinId: jest.fn().mockImplementation((entity) => entity),
  update: jest.fn(),
};
