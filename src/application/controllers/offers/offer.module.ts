import { OfferController } from './offer.controller';
import { Module } from '@nestjs/common';
import { ClientFavoriteOfferUseCase } from 'src/domain/use-cases/add-client-favorite-offer.usecase';
import { BuyOfferUseCase } from 'src/domain/use-cases/buy-offer.usecase';
import { CreateNewOfferUseCase } from 'src/domain/use-cases/create-new-offer.usecase';
import { DeleteOfferUseCase } from 'src/domain/use-cases/delete-offer.usecase';
import { FindClientFavoriteOffer } from 'src/domain/use-cases/find-client-favorite-offer.usecase';
import { ListTodayOffersUseCase } from 'src/domain/use-cases/list-today-offers.usecase';
import { ClientFavoriteOffersEntity } from 'src/shared/domain/infrastructure/typeorm/entities/client-favorite-offers-entity';
import { PostgresModule } from 'src/shared/domain/infrastructure/typeorm/typeorm.module';

@Module({
  imports: [PostgresModule],
  controllers: [OfferController],
  providers: [
    CreateNewOfferUseCase,
    DeleteOfferUseCase,
    ClientFavoriteOffersEntity,
    FindClientFavoriteOffer,
    ListTodayOffersUseCase,
    ClientFavoriteOfferUseCase,
    BuyOfferUseCase,
  ],
})
export class OfferModule {}
