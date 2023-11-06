import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { WalletRepository } from 'src/domain/repositories/wallet-repository';
import { WalletEntity } from '../entities/wallet-entity';

@Injectable()
export class WalletAdapter implements WalletRepository {
  constructor(
    @InjectRepository(WalletEntity)
    private readonly walletRepository: Repository<WalletEntity>,
  ) {}

  async findByClientId(id: number): Promise<WalletEntity[]> {
    const client = await this.walletRepository.find({
      where: { clientId: id },
    });
    return client;
  }

  async update(wallet: WalletEntity): Promise<void> {
    await this.walletRepository.update(
      {
        id: wallet.id,
      },
      {
        balance: wallet.balance,
      },
    );
  }
}
