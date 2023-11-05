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

  @Column({ name: 'coin_id' })
  coinId?: number;

  @Column({ name: 'balance' })
  balance: number;

  @Column({ name: 'client_id' })
  clientId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
