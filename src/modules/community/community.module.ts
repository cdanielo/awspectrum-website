import { Module } from '@nestjs/common';
import { PrismaModule } from '../../shared/prisma/prisma.module';
import { CommunityController } from './community.controller';
import { CommunityService } from './community.service';
import { CommunityRepository } from './community.repository';

@Module({
  imports: [PrismaModule],
  controllers: [CommunityController],
  providers: [CommunityService, CommunityRepository],
  exports: [CommunityService],
})
export class CommunityModule {}
