import { CoinsToWalletEntity } from 'src/shared/domain/infrastructure/typeorm/entities/coins-to-wallet';

export const COINS_TO_WALLET_REPOSITORY = 'COINS_TO_WALLET_REPOSITORY';

export interface CoinsToWalletRepository {
  findByCoinId(id: number, walletId: number): Promise<CoinsToWalletEntity>;
  update(coin: CoinsToWalletEntity): Promise<void>;
  findByWalletId(walletId: number): Promise<CoinsToWalletEntity>;
  findById(id: number): Promise<CoinsToWalletEntity>;
}
