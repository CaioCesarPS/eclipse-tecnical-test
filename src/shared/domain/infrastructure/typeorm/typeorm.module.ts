import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffersEntity } from './entities/offer-entity';
import { WalletEntity } from './entities/wallet-entity';
import { CoinEntity } from './entities/coin-entity';
import { ClientsEntity } from './entities/client-entity';
import { CLIENT_REPOSITORY } from 'src/domain/repositories/client-repository';
import { ClientAdapter } from './repositories/client.adapter';
import { WALLET_REPOSITORY } from 'src/domain/repositories/wallet-repository';
import { WalletAdapter } from './repositories/wallet.adapter';
import { CoinsToWalletEntity } from './entities/coins-to-wallet';
import { COINS_TO_WALLET_REPOSITORY } from 'src/domain/repositories/coins-to-wallet-repository';
import { COIN_REPOSITORY } from 'src/domain/repositories/coin-repository';
import { OFFER_REPOSITORY } from 'src/domain/repositories/offer-repository';
import { CoinsToWalletAdapter } from './repositories/coins-to-wallet.adapter';
import { CoinAdapter } from './repositories/coin.adapter';
import { OfferAdapter } from './repositories/offer.adapter';
import { ClientFavoriteOffersEntity } from './entities/client-favorite-offers-entity';
import { CLIENT_FAVORITE_OFFERS } from 'src/domain/repositories/client-favorite-offers.repository';
import { ClientFavoriteOffersAdapter } from './repositories/client-favorite-offers.adapter';

const typeOrmConnection = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [
    ClientsEntity,
    WalletEntity,
    CoinsToWalletEntity,
    CoinEntity,
    OffersEntity,
    ClientFavoriteOffersEntity,
  ],
  logging: true,
});

const typeOrmForFeature = TypeOrmModule.forFeature([
  ClientsEntity,
  WalletEntity,
  CoinsToWalletEntity,
  CoinEntity,
  OffersEntity,
  ClientFavoriteOffersEntity,
]);

@Module({
  imports: [typeOrmConnection, typeOrmForFeature],
  providers: [
    ClientAdapter,
    WalletAdapter,
    CoinsToWalletEntity,
    CoinEntity,
    OffersEntity,
    ClientFavoriteOffersEntity,
    {
      provide: CLIENT_REPOSITORY,
      useClass: ClientAdapter,
    },
    {
      provide: WALLET_REPOSITORY,
      useClass: WalletAdapter,
    },
    {
      provide: COINS_TO_WALLET_REPOSITORY,
      useClass: CoinsToWalletAdapter,
    },
    {
      provide: COIN_REPOSITORY,
      useClass: CoinAdapter,
    },
    {
      provide: OFFER_REPOSITORY,
      useClass: OfferAdapter,
    },
    {
      provide: CLIENT_FAVORITE_OFFERS,
      useClass: ClientFavoriteOffersAdapter,
    },
  ],
  exports: [
    CLIENT_REPOSITORY,
    WALLET_REPOSITORY,
    COINS_TO_WALLET_REPOSITORY,
    COIN_REPOSITORY,
    OFFER_REPOSITORY,
    CLIENT_FAVORITE_OFFERS,
  ],
})
export class PostgresModule {}
