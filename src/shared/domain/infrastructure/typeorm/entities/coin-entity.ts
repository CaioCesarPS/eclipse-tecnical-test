import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'coins' })
export class CoinEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'current_price' })
  currentPrice: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
