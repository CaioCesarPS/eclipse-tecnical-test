import { InjectRepository } from '@nestjs/typeorm';
import { ClientRepository } from 'src/domain/repositories/client-repository';
import { ClientsEntity } from '../entities/client-entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientAdapter implements ClientRepository {
  constructor(
    @InjectRepository(ClientsEntity)
    private readonly clientRepository: Repository<ClientsEntity>,
  ) {}

  async findById(id: number) {
    const client = await this.clientRepository.findOne({
      where: { id },
    });
    return client;
  }
}
