import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CLIENT_REPOSITORY,
  ClientRepository,
} from '../repositories/client-repository';
import {
  OfferRepository,
  OFFER_REPOSITORY,
} from '../repositories/offer-repository';
import { DeleteOfferDTO } from 'src/application/input/delete-offer.dto';

@Injectable()
export class DeleteOfferUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: ClientRepository,
    @Inject(OFFER_REPOSITORY)
    private readonly offerRepository: OfferRepository,
  ) {}

  async execute({ clientId, coinId, offerId }: DeleteOfferDTO): Promise<void> {
    const client = await this.clientRepository.findById(clientId);
    const offer = await this.offerRepository.findById(offerId);

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    if (!offer) {
      throw new NotFoundException('Offer not found');
    }

    if (client.toDomain().id !== offer.clientId) {
      throw new BadRequestException('You can only delete your own offers');
    }

    await this.offerRepository.delete({
      offerId,
      coinId,
      walletId: offer.walletId,
    });
  }
}
