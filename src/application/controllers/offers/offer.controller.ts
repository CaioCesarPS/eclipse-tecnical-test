import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateOfferDTO } from 'src/application/input/create-offer.dto';
import { DeleteOfferDTO } from 'src/application/input/delete-offer.dto';
import { ClientFavoriteOfferUseCase } from 'src/domain/use-cases/add-client-favorite-offer.usecase';
import { CreateNewOfferUseCase } from 'src/domain/use-cases/create-new-offer.usecase';
import { DeleteOfferUseCase } from 'src/domain/use-cases/delete-offer.usecase';
import { ListTodayOffersUseCase } from 'src/domain/use-cases/list-today-offers.usecase';
import { OffersEntity } from 'src/shared/domain/infrastructure/typeorm/entities/offer-entity';
import { Pagination } from 'src/shared/domain/utils/pagination';

@Controller('offers')
export class OfferController {
  constructor(
    private readonly createOfferUseCase: CreateNewOfferUseCase,
    private readonly listTodayOffersUseCase: ListTodayOffersUseCase,
    private readonly deleteOfferUseCase: DeleteOfferUseCase,
    private readonly addFavoriteOffer: ClientFavoriteOfferUseCase,
  ) {}

  @Post('create-offer')
  async createOffer(@Body() createOfferDto: CreateOfferDTO) {
    await this.createOfferUseCase.execute(createOfferDto);
  }

  @Delete('delete-offer')
  async deleteOffer(@Body() deleteOfferDto: DeleteOfferDTO) {
    await this.deleteOfferUseCase.execute(deleteOfferDto);
  }

  @Get('today-offers')
  async listTodayOffers(
    @Query('page') page: number,
  ): Promise<Pagination<OffersEntity[]>> {
    return await this.listTodayOffersUseCase.execute(page);
  }

  @Post('add-favorite-offer/:offerId/client/:clientId')
  async addClientFavoriteOffer(
    @Param('offerId') offerId: number,
    @Param('clientId') clientId: number,
  ) {
    return await this.addFavoriteOffer.execute(offerId, clientId);
  }
}
