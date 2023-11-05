import { ClientsEntity } from 'src/shared/domain/infrastructure/typeorm/entities/client-entity';

export const CLIENT_REPOSITORY = 'CLIENT_REPOSITORY';

export interface ClientRepository {
  findById(id: number): Promise<ClientsEntity>;
}
