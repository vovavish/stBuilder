import { Module } from '@nestjs/common';
import { UserPagesController } from './userPages.controller';
import { UserPagesService } from './userPages.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UserPagesController],
  providers: [UserPagesService, PrismaService],
})
export class UserPagesModule {}