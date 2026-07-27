import { Module } from '@nestjs/common';
import { PrismaModule } from '../../shared/prisma/prisma.module';
import { MerchController } from './merch.controller';
import { MerchService } from './merch.service';
import { MerchRepository } from './merch.repository';

@Module({
  imports: [PrismaModule],
  controllers: [MerchController],
  providers: [MerchService, MerchRepository],
  exports: [MerchService],
})
export class MerchModule {}
