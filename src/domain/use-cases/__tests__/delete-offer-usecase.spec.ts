import { BadRequestException, NotFoundException } from '@nestjs/common';
import { DeleteOfferUseCase } from '../delete-offer.usecase';
import {
  clientRepository,
  makeClient,
  makeOffer,
  offerRepository,
} from './mocks/mock.repository';
describe('Delete Offer UseCase', () => {
  const adapter = new DeleteOfferUseCase(clientRepository, offerRepository);
  it('should delete an offer', async () => {
    clientRepository.findById.mockReturnValue(makeClient(1, 'CaioCPS'));
    offerRepository.findById.mockReturnValue(makeOffer(1, 1, 'BTC', 10, 1000));

    expect(
      adapter.execute({
        clientId: 1,
        coinId: 1,
        offerId: 1,
      }),
    ).resolves;
  });

  it('should throw a error if client try to delete an offer that is not his', async () => {
    clientRepository.findById.mockReturnValue(makeClient(1, 'CaioCPS'));
    offerRepository.findById.mockReturnValue(makeOffer(1, 2, 'BTC', 10, 1000));

    expect(
      adapter.execute({
        clientId: 1,
        coinId: 1,
        offerId: 1,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should throw a error if client try to delete an offer that does not exist', async () => {
    clientRepository.findById.mockReturnValue(makeClient(1, 'CaioCPS'));
    offerRepository.findById.mockReturnValue(null);

    expect(
      adapter.execute({
        clientId: 1,
        coinId: 1,
        offerId: 1,
      }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should throw a error if client does not exist', async () => {
    clientRepository.findById.mockReturnValue(null);
    offerRepository.findById.mockReturnValue(makeOffer(1, 2, 'BTC', 10, 1000));

    expect(
      adapter.execute({
        clientId: 1,
        coinId: 1,
        offerId: 1,
      }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
