import { Injectable, Logger, Optional } from '@nestjs/common';
import { EntityManager, EntityTarget, Repository } from 'typeorm';
import { GetBlockedUsersInput } from '../../creator-profiles';
import { CreatorBlocksEntity } from '../entities';

@Injectable()
export class CreatorBlocksRepository extends Repository<CreatorBlocksEntity> {
  private logger = new Logger(CreatorBlocksEntity.name);

  constructor(@Optional() _target: EntityTarget<CreatorBlocksEntity>, entityManager: EntityManager) {
    super(CreatorBlocksEntity, entityManager);
  }

  public async getBlockedUsers(creatorId: string, input: GetBlockedUsersInput) {
    const query = this.createQueryBuilder('creator_blocks')
      .leftJoin('creator_blocks.fanProfile', 'fanProfile')
      .leftJoin('fanProfile.user', 'user')
      .addSelect(['fanProfile.username', 'fanProfile.fullName', 'fanProfile.avatarUrl', 'fanProfile.fanId'])
      .where('creator_blocks.creatorId = :creatorId', { creatorId: creatorId })
      .limit(30)
      .offset(input.offset);

    return await query.getMany();
  }
}
