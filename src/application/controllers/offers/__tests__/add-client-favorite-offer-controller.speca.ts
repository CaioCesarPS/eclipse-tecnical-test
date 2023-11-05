// import { Test } from '@nestjs/testing';
// import { OfferController } from 'src/application/controllers/offers/offer.controller';
// import { ClientFavoriteOfferUseCase } from '../../../../domain/use-cases/add-client-favorite-offer.usecase';

// describe('Add Client Favorite Offer Use Case', () => {
//   let offerController: OfferController;
//   let clientFavoriteOfferUseCase: ClientFavoriteOfferUseCase;

//   beforeEach(async () => {
//     const moduleRef = await Test.createTestingModule({
//       controllers: [OfferController],
//       providers: [ClientFavoriteOfferUseCase],
//     }).compile();

//     clientFavoriteOfferUseCase = moduleRef.get<ClientFavoriteOfferUseCase>(
//       ClientFavoriteOfferUseCase,
//     );
//     offerController = moduleRef.get<OfferController>(OfferController);
//   });

//   describe('findAll', () => {
//     it('should return an array of cats', async () => {
//       const offerId = 1;
//       const clientId = 1;
//       const result = ['test'];
//       jest
//         .spyOn(clientFavoriteOfferUseCase, 'execute')
//         .mockImplementation(() => result);

//       expect(
//         await offerController.addClientFavoriteOffer(offerId, clientId),
//       ).toBe(result);
//     });
//   });
// });
