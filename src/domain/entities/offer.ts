interface OfferProps {
  id?: number;
  giftCounterId: number;
  clientId: number;
  walletId: number;
  coinName: string;
  value: number;
}

export class Offer {
  id?: number;
  giftCounterId: number;
  clientId: number;
  walletId: number;
  coinName: string;
  value: number;

  constructor(props: OfferProps) {
    this.id = props.id;
    this.giftCounterId = props.giftCounterId;
    this.clientId = props.clientId;
    this.coinName = props.coinName;
    this.walletId = props.walletId;
    this.value = props.value;
  }

  static create(props: Offer): Offer {
    return new Offer(props);
  }

  public validateOffer(coinBalance: number) {
    if (this.value > coinBalance) {
      throw new Error('Insufficient funds');
    }
  }
}
