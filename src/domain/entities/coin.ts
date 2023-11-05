interface CoinProps {
  id: number;
  name: string;
  createdAt?: Date;
}

export class Coin {
  id: number;
  name: string;
  walletId: number;
  createdAt?: Date;

  constructor(props: CoinProps) {
    this.id = props.id;
    this.name = props.name;
    this.createdAt = props.createdAt;
  }

  static create(props: Coin): Coin {
    return new Coin(props);
  }
}
