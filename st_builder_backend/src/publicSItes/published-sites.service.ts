import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PublishedSitesService {
  constructor(private prisma: PrismaService) {}

  async publishSite(userSiteId: number, siteAddress: string) {
    // Проверяем, существует ли UsersSites
    const userSite = await this.prisma.usersSites.findUnique({
      where: { id: userSiteId },
    });

    if (!userSite) {
      throw new NotFoundException(`Site with ID ${userSiteId} not found`);
    }

    // Проверяем, не занят ли site_address другим опубликованным сайтом
    const existingPublishedSite = await this.prisma.publishedSites.findUnique({
      where: { site_address: siteAddress },
    });

    if (existingPublishedSite && existingPublishedSite.user_site_id !== userSiteId) {
      throw new ConflictException(`Site address ${siteAddress} is already in use by another published site`);
    }

    // Проверяем, есть ли уже опубликованная версия для этого UsersSites
    const currentPublishedSite = await this.prisma.publishedSites.findUnique({
      where: { user_site_id: userSiteId },
    });

    if (currentPublishedSite) {
      // Если уже есть опубликованная версия, обновляем её
      return this.prisma.publishedSites.update({
        where: { id: currentPublishedSite.id },
        data: {
          site_data: userSite.site_data, // Копируем актуальные данные из UsersSites
          site_address: siteAddress,
          publishedAt: new Date(),
        },
      });
    }

    // Если опубликованной версии нет, создаём новую
    return this.prisma.publishedSites.create({
      data: {
        user_site_id: userSiteId,
        site_data: userSite.site_data, // Копируем данные из UsersSites
        site_address: siteAddress,
        publishedAt: new Date(),
      },
    });
  }

  async getPublishedSiteByAddress(siteAddress: string) {
    const publishedSite = await this.prisma.publishedSites.findUnique({
      where: { site_address: siteAddress },
    });

    if (!publishedSite) {
      throw new NotFoundException(`Published site with address ${siteAddress} not found`);
    }

    return publishedSite;
  }
}