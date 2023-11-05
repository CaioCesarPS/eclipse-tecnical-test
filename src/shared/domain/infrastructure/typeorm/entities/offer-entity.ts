import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'offers' })
export class OffersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'gift_counter_id' })
  giftCounterId: number;

  @Column({ name: 'client_id' })
  clientId: number;

  @Column({ name: 'wallet_id' })
  walletId: number;

  @Column({ name: 'coin_name' })
  coinName: string;

  @Column()
  value: number;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
