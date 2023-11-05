import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CoinRepository } from 'src/domain/repositories/coin-repository';
import { CoinEntity } from '../entities/coin-entity';
import { Coin } from 'src/domain/entities/coin';

@Injectable()
export class CoinAdapter implements CoinRepository {
  constructor(
    @InjectRepository(CoinEntity)
    private readonly coinRepository: Repository<CoinEntity>,
  ) {}

  async findById(id: number): Promise<CoinEntity[]> {
    return await this.coinRepository.find({
      where: { id },
    });
  }
  async update(coin: Coin): Promise<void> {
    const coinEntity = new Coin({
      id: coin.id,
      name: coin.name,
    });

    await this.coinRepository.update(coin.id, coinEntity);
  }
}
