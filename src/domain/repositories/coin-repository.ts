import { CoinEntity } from 'src/shared/domain/infrastructure/typeorm/entities/coin-entity';
import { Coin } from '../entities/coin';

export const COIN_REPOSITORY = 'COIN_REPOSITORY';

export interface CoinRepository {
  findById(id: number): Promise<CoinEntity[]>;
  update(coin: Coin): Promise<void>;
}
