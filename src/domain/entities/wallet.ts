import { Coin } from './coin';

interface WalletProps {
  id: number;
  Coin?: Coin[];
  clientId: number;
  createdAt: Date;
}

export class Wallet {
  id: number;
  Coin?: Coin[];
  clientId: number;
  createdAt: Date;

  constructor(props: WalletProps) {
    this.id = props.id;
    this.Coin = props.Coin;
    this.clientId = props.clientId;
    this.createdAt = props.createdAt;
  }
}
