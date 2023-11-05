import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'coins_to_wallet' })
export class CoinsToWalletEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'coin_id' })
  coinId: number;

  @Column({ name: 'wallet_id' })
  walletId: number;

  @Column({ name: 'coin_quantity' })
  coinQuantity: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;
}
