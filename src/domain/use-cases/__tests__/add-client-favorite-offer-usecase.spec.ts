import { ClientFavoriteOfferUseCase } from '../add-client-favorite-offer.usecase';

describe('Add Client Favorite Offer Use Case', () => {
  const clientFavoriteOffersRepository = {
    findByClientId: jest.fn(),
    addFavoriteOffer: jest.fn(),
  };
  const adapter = new ClientFavoriteOfferUseCase(
    clientFavoriteOffersRepository,
  );

  it('should add a favorite offer', async () => {
    expect(adapter.execute(1, 1)).resolves;
  });
});
