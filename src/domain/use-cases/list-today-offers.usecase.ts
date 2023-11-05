import { Inject, Injectable } from '@nestjs/common';
import {
  OfferRepository,
  OFFER_REPOSITORY,
} from '../repositories/offer-repository';

@Injectable()
export class ListTodayOffersUseCase {
  constructor(
    @Inject(OFFER_REPOSITORY)
    private readonly offerRepository: OfferRepository,
  ) {}

  async execute(page = 1) {
    return await this.offerRepository.findByToday(page);
  }
}
