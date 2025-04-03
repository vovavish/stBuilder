import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { PublishedSitesService } from './published-sites.service';
import { AuthGuard } from '@nestjs/passport'; // Предполагаем, что у вас есть авторизация
import { AtGuard } from 'src/common/guadrs';
import { Public } from 'src/common/decorators';

@Controller('published-sites')
export class PublishedSitesController {
  constructor(private readonly publishedSitesService: PublishedSitesService) {}

  @Post('publish')
  @UseGuards(AtGuard)
  async publishSite(
    @Body('userSiteId') userSiteId: number,
    @Body('siteAddress') siteAddress: string,
  ) {
    return this.publishedSitesService.publishSite(userSiteId, siteAddress);
  }

  @Get(':siteAddress')
  @Public()
  async getPublishedSite(@Param('siteAddress') siteAddress: string) {
    return this.publishedSitesService.getPublishedSiteByAddress(siteAddress);
  }
}