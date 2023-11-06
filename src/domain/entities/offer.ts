interface OfferProps {
  id?: number;
  giftCounterId: number;
  clientId: number;
  walletId: number;
  coinName: string;
  coinQuantity: number;
  totalOfferValue: number;
  active?: boolean;
}

export class Offer {
  id?: number;
  giftCounterId: number;
  clientId: number;
  walletId: number;
  coinName: string;
  coinQuantity: number;
  totalOfferValue: number;
  active?: boolean;

  constructor(props: OfferProps) {
    this.id = props.id;
    this.giftCounterId = props.giftCounterId;
    this.clientId = props.clientId;
    this.walletId = props.walletId;
    this.coinName = props.coinName;
    this.coinQuantity = props.coinQuantity;
    this.totalOfferValue = props.totalOfferValue;
    this.active = props.active ?? true;
  }

  static create(props: Offer): Offer {
    return new Offer(props);
  }

  public validateOffer(offerCoinQuantity: number) {
    if (this.coinQuantity > offerCoinQuantity) {
      throw new Error('Insufficient coins to create offer');
    }
  }
}
