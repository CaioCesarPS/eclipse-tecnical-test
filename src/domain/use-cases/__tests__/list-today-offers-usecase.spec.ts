import { Pagination } from 'src/shared/domain/utils/pagination';
import { ListTodayOffersUseCase } from '../list-today-offers.usecase';
import { makeOffer, offerRepository } from './mocks/mock.repository';
import { OffersEntity } from 'src/shared/domain/infrastructure/typeorm/entities/offer-entity';

describe('List Today Offers Use Case', () => {
  const adapter = new ListTodayOffersUseCase(offerRepository);

  it('should list all offers from today', async () => {
    const paginatedResponseOffers: Pagination<OffersEntity[]> = {
      data: [makeOffer(1, 1, 'BTC', 10, 1000)],
      page: 1,
      limit: 10,
    };

    offerRepository.findByToday.mockReturnValue(paginatedResponseOffers);

    expect(adapter.execute()).resolves.toEqual(paginatedResponseOffers);
  });
});
