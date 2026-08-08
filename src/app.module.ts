import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './shared/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { ContactModule } from './modules/contact/contact.module';
import { AuthModule } from './modules/auth/auth.module';
import { EventModule } from './modules/event/event.module';
import { RegistrationModule } from './modules/registration/registration.module';
import { MerchModule } from './modules/merch/merch.module';
import { CommunityModule } from './modules/community/community.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { HealthModule } from './modules/health/health.module';
import { RolesGuard } from './common/guards/roles.guard';
import appConfig from './config/app.config';
import { envSchema } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [appConfig],
      validate: (config: Record<string, unknown>) => envSchema.parse(config),
    }),
    ThrottlerModule.forRoot([
      {
        ttl: parseInt(process.env.THROTTLE_TTL ?? '60', 10) * 1000,
        limit: parseInt(process.env.THROTTLE_LIMIT ?? '10', 10),
      },
    ]),
    ScheduleModule.forRoot(),
    PrismaModule,
    UserModule,
    ContactModule,
    AuthModule,
    EventModule,
    RegistrationModule,
    MerchModule,
    CommunityModule,
    NotificationsModule,
    HealthModule,
  ],
  providers: [RolesGuard],
})
export class AppModule {}
