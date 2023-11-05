import { FindClientFavoriteOffer } from '../find-client-favorite-offer.usecase';
import {
  clientFavoriteOffersRepository,
  makeOffer,
} from './mocks/mock.repository';

describe('Find Client Favorite Offer UseCase', () => {
  const adapter = new FindClientFavoriteOffer(clientFavoriteOffersRepository);

  it('should find client favorite offers', async () => {
    const mockOutput = [
      makeOffer(1, 1, 'BTC', 10, 1000),
      makeOffer(2, 1, 'BTC', 10, 1000),
      makeOffer(3, 1, 'BTC', 10, 1000),
    ];

    clientFavoriteOffersRepository.findByClientId.mockReturnValue(mockOutput);

    const output = adapter.execute(1, 1);

    expect(output).resolves.toEqual(mockOutput);
  });
});
