import { Module } from '@nestjs/common';
import { PrismaModule } from '../../shared/prisma/prisma.module';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { RegistrationRepository } from './registration.repository';
import { EventModule } from '../event/event.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [PrismaModule, EventModule, NotificationsModule],
  controllers: [RegistrationController],
  providers: [RegistrationService, RegistrationRepository],
  exports: [RegistrationService],
})
export class RegistrationModule {}
