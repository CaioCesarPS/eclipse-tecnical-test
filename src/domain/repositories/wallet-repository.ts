import { WalletEntity } from 'src/shared/domain/infrastructure/typeorm/entities/wallet-entity';

export const WALLET_REPOSITORY = 'WALLET_REPOSITORY';

export interface WalletRepository {
  findByClientId(id: number): Promise<WalletEntity[]>;
}
