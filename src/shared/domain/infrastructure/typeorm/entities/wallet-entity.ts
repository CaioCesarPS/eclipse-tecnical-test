import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'wallets' })
export class WalletEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'balance' })
  balance: number;

  @Column({ name: 'client_id' })
  clientId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  public validateBuyOperation(offerValue: number): void {
    if (offerValue > this.balance) {
      throw new Error('Insufficient balance');
    }
  }

  public addBalanceToWallet(offerValue: number): void {
    this.balance += offerValue;
  }

  public removeBalanceToWallet(offerValue: number): void {
    this.balance -= offerValue;
  }

  toDomain() {
    return {
      id: this.id,
      balance: this.balance,
      clientId: this.clientId,
      createdAt: this.createdAt,
    };
  }
}
