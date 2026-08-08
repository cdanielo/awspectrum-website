import { Module } from '@nestjs/common';
import { PrismaModule } from '../../shared/prisma/prisma.module';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { EventRepository } from './event.repository';

@Module({
  imports: [PrismaModule],
  controllers: [EventController],
  providers: [EventService, EventRepository],
  exports: [EventService, EventRepository],
})
export class EventModule {}
