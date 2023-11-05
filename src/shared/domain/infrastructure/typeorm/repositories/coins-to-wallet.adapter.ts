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

  async findByCoinId(id: number): Promise<CoinsToWalletEntity> {
    return await this.coinToWalletRepository.findOne({
      where: { coinId: id },
    });
  }
  async update(coin: CoinsToWalletEntity): Promise<void> {
    const updatedCoinBalance = {
      coinId: coin.coinId,
      walletId: coin.walletId,
      coinQuantity: coin.coinQuantity,
    };

    await this.coinToWalletRepository.update(coin.id, updatedCoinBalance);
  }
}
