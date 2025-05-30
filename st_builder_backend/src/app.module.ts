import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guadrs';
import { UserSitesModule } from './userSites/userSites.module';
import { UserLayoutsModule } from './userLayouts/userLayouts.module';
import { RolesGuard } from './roles/roles.guard';
import { UploadFileModule } from './upload-file/upload-file.module';
import { UserPagesModule } from './userPages/userPages.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    PrismaModule,
    UserSitesModule,
    UserLayoutsModule,
    UploadFileModule,
    UserPagesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
