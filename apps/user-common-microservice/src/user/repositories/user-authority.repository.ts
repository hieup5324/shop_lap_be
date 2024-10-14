import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserRole } from '../entities/user-role.entity';

@Injectable()
export class UserAuthorityRepository extends Repository<UserRole> {
  constructor(private dataSource: DataSource) {
    super(UserRole, dataSource.createEntityManager());
  }

  async getUserRolesById(userId: string): Promise<UserRole[]> {
    const queryBuilder = this.createQueryBuilder('userAuthorities')
      .leftJoinAndSelect('userAuthorities.role', 'role')
      .where('userAuthorities.userId = :userId', { userId });
    return queryBuilder.getMany();
  }
}
