import { Module } from '@nestjs/common';
import { PublishedSitesService } from './published-sites.service';
import { PublishedSitesController } from './published-sites.controller';
import { PrismaService } from '../prisma/prisma.service'; // Предполагаем, что у вас есть PrismaService

@Module({
  providers: [PublishedSitesService, PrismaService],
  controllers: [PublishedSitesController],
})
export class PublishedSitesModule {}