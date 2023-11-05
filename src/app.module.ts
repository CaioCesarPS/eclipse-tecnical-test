import { Module } from '@nestjs/common';
import { PostgresModule } from './shared/domain/infrastructure/typeorm/typeorm.module';
import { OfferModule } from './application/controllers/offers/offer.module';

@Module({
  imports: [PostgresModule, OfferModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
