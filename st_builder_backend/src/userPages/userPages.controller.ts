import { Controller, Get, Post, Param, Body, Delete, Patch, UseGuards, ParseIntPipe, NotFoundException, Req, BadRequestException } from '@nestjs/common';
import { UserPagesService } from './userPages.service';
import { CreatePageDto } from './dto/CreatePageDto';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { AtGuard } from 'src/common/guadrs';

@Controller('pages')
export class UserPagesController {
  constructor(private readonly userPagesService: UserPagesService) {}

  @Get('getPublishedPage/*')
  @Public()
  async getPublishedPage(@Req() request: Request) {
    const path = request.url.replace('/pages/getPublishedPage/', '');
    const [site_name, ...slugParts] = path.split('/');
    const page_slug = slugParts.join('/') || '';

    return this.userPagesService.getPublishedPageBySlug(site_name, page_slug);
  }

  // Создание новой страницы для сайта
  @UseGuards(AtGuard)
  @Post('create/:site_id')
  async createPage(
    @GetCurrentUserId() user_id: number,
    @Param('site_id', ParseIntPipe) site_id: number,
    @Body() createPageDto: CreatePageDto,
  ) {
    return this.userPagesService.createPage(user_id, site_id, createPageDto);
  }

  // Получение всех страниц сайта
  @UseGuards(AtGuard)
  @Get('getPages/:site_id')
  async getPages(
    @GetCurrentUserId() user_id: number,
    @Param('site_id', ParseIntPipe) site_id: number,
  ) {
    return this.userPagesService.getPagesBySiteId(user_id, site_id);
  }

  // Получение страницы по ID
  @UseGuards(AtGuard)
  @Get('getPage/:page_id')
  async getPageById(
    @GetCurrentUserId() user_id: number,
    @Param('page_id', ParseIntPipe) page_id: number,
  ) {
    return this.userPagesService.getPageById(user_id, page_id);
  }

  // Обновление страницы по ID
  @UseGuards(AtGuard)
  @Patch('updatePage/:page_id')
  async updatePage(
    @GetCurrentUserId() user_id: number,
    @Param('page_id', ParseIntPipe) page_id: number,
    @Body() updatePageDto: CreatePageDto,
  ) {
    return this.userPagesService.updatePage(user_id, page_id, updatePageDto);
  }

  // Удаление страницы по ID
  @UseGuards(AtGuard)
  @Delete('deletePage/:page_id')
  async deletePage(
    @GetCurrentUserId() user_id: number,
    @Param('page_id', ParseIntPipe) page_id: number,
  ) {
    return this.userPagesService.deletePage(user_id, page_id);
  }

  @UseGuards(AtGuard)
  @Post('publish/:page_id')
  async publishPage(
    @GetCurrentUserId() user_id: number,
    @Param('page_id', ParseIntPipe) page_id: number,
  ) {
    return this.userPagesService.publishPage(user_id, page_id);
  }

  @UseGuards(AtGuard)
  @Get('getPublishedPages/:site_id')
  async getPublishedPagesBySiteId(
    @GetCurrentUserId() user_id: number,
    @Param('site_id', ParseIntPipe) site_id: number,
  ) {
    return this.userPagesService.getPublishedPagesBySiteId(user_id, site_id);
  }
}