import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePageDto } from './dto/CreatePageDto';

@Injectable()
export class UserPagesService {
  constructor(private prisma: PrismaService) {}

  async createPage(user_id: number, site_id: number, createPageDto: CreatePageDto) {
    const site = await this.prisma.usersSites.findUnique({
      where: { id: site_id, user_id },
    });
  
    if (!site) {
      throw new NotFoundException(
        `Site with ID ${site_id} not found or does not belong to user`,
      );
    }
  
    try {
      return await this.prisma.page.create({
        data: {
          user_site_id: site_id,
          page_name: createPageDto.page_name,
          page_slug: createPageDto.page_slug,
          page_data: createPageDto.page_data,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          `Страница с адресом "${createPageDto.page_slug}" уже существует в этом сайте`
        );
      }
      throw error;
    }
  }

  async getPagesBySiteId(user_id: number, site_id: number) {
    const site = await this.prisma.usersSites.findUnique({
      where: { id: site_id, user_id },
    });

    if (!site) {
      throw new NotFoundException(
        `Site with ID ${site_id} not found or does not belong to user`,
      );
    }

    return this.prisma.page.findMany({
      where: { user_site_id: site_id },
      select: {
        id: true,
        page_name: true,
        page_slug: true,
        page_data: true,
        createdAt: true,
        updatedAt: true,
        publishedPages: true, // Включаем данные опубликованной версии
      },
      orderBy: { id: 'asc' },
    });
  }

  async getPageById(user_id: number, page_id: number) {
    const page = await this.prisma.page.findUnique({
      where: { id: page_id },
      include: {
        userSite: { select: { user_id: true } },
        publishedPages: true,
      }, // Включаем опубликованную версию
    });

    if (!page) {
      throw new NotFoundException(`Page with ID ${page_id} not found`);
    }

    if (page.userSite.user_id !== user_id) {
      throw new ForbiddenException(
        `You do not have permission to access this page`,
      );
    }

    return page;
  }

  async updatePage(
    user_id: number,
    page_id: number,
    updatePageDto: CreatePageDto,
  ) {
    const page = await this.prisma.page.findUnique({
      where: { id: page_id },
      include: { userSite: { select: { user_id: true } } },
    });

    if (!page) {
      throw new NotFoundException(`Page with ID ${page_id} not found`);
    }

    if (page.userSite.user_id !== user_id) {
      throw new ForbiddenException(
        `You do not have permission to update this page`,
      );
    }

    try {
      return this.prisma.page.update({
        where: { id: page_id },
        data: {
          page_name: updatePageDto.page_name,
          page_slug: updatePageDto.page_slug,
          page_data: updatePageDto.page_data,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          `Страница с адресом "${updatePageDto.page_slug}" уже существует в этом сайте`
        );
      }
      throw error;
    }
  }

  async deletePage(user_id: number, page_id: number) {
    const page = await this.prisma.page.findUnique({
      where: { id: page_id },
      include: { userSite: { select: { user_id: true } } },
    });

    if (!page) {
      throw new NotFoundException(`Page with ID ${page_id} not found`);
    }

    if (page.userSite.user_id !== user_id) {
      throw new ForbiddenException(
        `You do not have permission to delete this page`,
      );
    }

    return this.prisma.page.delete({
      where: { id: page_id },
    });
  }

  // Метод для публикации страницы
  async publishPage(user_id: number, page_id: number) {
    const page = await this.prisma.page.findUnique({
      where: { id: page_id },
      include: { userSite: { select: { user_id: true } } },
    });

    if (!page) {
      throw new NotFoundException(`Page with ID ${page_id} not found`);
    }

    if (page.userSite.user_id !== user_id) {
      throw new ForbiddenException(
        `You do not have permission to publish this page`,
      );
    }

    // Проверяем, существует ли уже опубликованная версия
    const existingPublishedPage = await this.prisma.publishedPages.findUnique({
      where: { page_id },
    });

    if (existingPublishedPage) {
      // Если страница уже опубликована, обновляем её
      return this.prisma.publishedPages.update({
        where: { page_id },
        data: {
          published_data: page.page_data,
          publishedAt: new Date(),
        },
        include: {
          page: {
            select: {
              page_name: true,
              page_slug: true,
              userSite: {
                select: {
                  site_address: true,
                },
              },
            },
          },
        },
      });
    } else {
      // Если страницы нет, создаем новую опубликованную версию
      return this.prisma.publishedPages.create({
        data: {
          page_id,
          published_data: page.page_data,
        },
        include: {
          page: {
            select: {
              page_name: true,
              page_slug: true,
              userSite: {
                select: {
                  site_address: true,
                },
              },
            },
          },
        },
      });
    }
  }

  async getPublishedPageBySlug(site_address: string, page_slug: string) {
    // Нормализуем slug (убираем начальные/конечные слеши)
    const normalizedSlug = page_slug.replace(/^\/|\/$/g, '') || '';

    const site = await this.prisma.usersSites.findFirst({
      where: { site_address },
    });

    if (!site) {
      throw new NotFoundException(
        `Site with address ${site_address} not found`,
      );
    }

    const page = await this.prisma.page.findFirst({
      where: {
        user_site_id: site.id,
        page_slug: normalizedSlug === '/' ? '/' : normalizedSlug,
      },
      include: {
        publishedPages: true,
      },
    });

    if (!page || !page.publishedPages) {
      throw new NotFoundException(
        `Published page with slug "${normalizedSlug}" not found for site "${site_address}"`,
      );
    }

    return {
      site_name: site.site_name,
      page_name: page.page_name,
      page_slug: page.page_slug,
      published_data: page.publishedPages.published_data,
      publishedAt: page.publishedPages.publishedAt,
    };
  }

  async getPublishedPagesBySiteId(user_id: number, site_id: number) {
    const site = await this.prisma.usersSites.findUnique({
      where: { id: site_id, user_id },
    });

    if (!site) {
      throw new NotFoundException(
        `Site with ID ${site_id} not found or does not belong to user`,
      );
    }

    return this.prisma.publishedPages.findMany({
      where: { page: {
        userSite: {
          id: site_id,
        },
      } },
      select: {
        id: true,
        publishedAt: true,
      },
      orderBy: { id: 'asc' },
    });
  }
}
