import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'client_favorites_offers' })
export class ClientFavoriteOffersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  client_id: number;

  @Column()
  offer_id: number;

  @Column({ default: true })
  active: boolean;

  @Column()
  created_at: Date;
}
