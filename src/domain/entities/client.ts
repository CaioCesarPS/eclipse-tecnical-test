import { Wallet } from './wallet';

interface ClientProps {
  id: number;
  name: string;
  email: string;
  wallet?: Wallet[];
  favoriteOffersIds?: string[];
  createdAt: Date;
}

export class Client {
  id: number;
  name: string;
  email: string;
  wallet?: Wallet[];
  favoriteOffersIds?: string[];
  createdAt: Date;

  constructor(props: ClientProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.wallet = props.wallet;
    this.createdAt = props.createdAt;
  }

  static create(props: ClientProps): Client {
    return new Client(props);
  }
}
