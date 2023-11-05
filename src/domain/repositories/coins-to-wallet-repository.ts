import { CoinsToWalletEntity } from 'src/shared/domain/infrastructure/typeorm/entities/coins-to-wallet';

export const COINS_TO_WALLET_REPOSITORY = 'COINS_TO_WALLET_REPOSITORY';

export interface CoinsToWalletRepository {
  findByCoinId(id: number): Promise<CoinsToWalletEntity>;
  update(coin: CoinsToWalletEntity): Promise<void>;
}
