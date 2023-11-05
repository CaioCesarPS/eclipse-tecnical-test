interface AccountProps {
  id: number;
  clientId: string;
  walletId: string[];
  createdAt: Date;
}

export class Account {
  id: number;
  clientId: string;
  walletId: string[];
  createdAt: Date;

  constructor(props: AccountProps) {
    this.id = props.id;
    this.clientId = props.clientId;
    this.walletId = props.walletId;
    this.createdAt = props.createdAt;
  }
}
