import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CoinsToWalletRepository } from 'src/domain/repositories/coins-to-wallet-repository';
import { CoinsToWalletEntity } from '../entities/coins-to-wallet';

@Injectable()
export class CoinsToWalletAdapter implements CoinsToWalletRepository {
  constructor(
    @InjectRepository(CoinsToWalletEntity)
    private readonly coinToWalletRepository: Repository<CoinsToWalletEntity>,
  ) {}

  async findByCoinId(
    id: number,
    walletId: number,
  ): Promise<CoinsToWalletEntity> {
    return await this.coinToWalletRepository.findOne({
      where: { coinId: id, walletId },
    });
  }
  async update(coin: CoinsToWalletEntity): Promise<void> {
    await this.coinToWalletRepository.update(
      { id: coin.id, walletId: coin.walletId },
      { coinQuantity: coin.coinQuantity },
    );
  }

  findByWalletId(walletId: number): Promise<CoinsToWalletEntity> {
    return this.coinToWalletRepository.findOne({
      where: { walletId },
    });
  }

  findById(id: number): Promise<CoinsToWalletEntity> {
    return this.coinToWalletRepository.findOne({
      where: { id },
    });
  }
}
