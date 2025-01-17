import { Controller, Get, Post, Param, Body, Delete, Patch, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UserSitesService } from './userSites.service';
import { CreateSiteDto } from './dto/CreateSiteDto';
import { GetCurrentUserId } from 'src/common/decorators';
import { AtGuard } from 'src/common/guadrs';

@Controller('user-sites')
export class UserSitesController {
  constructor(private readonly userSitesService: UserSitesService) {}

  @UseGuards(AtGuard)
  @Post('create')
  async createSite(
    @GetCurrentUserId() user_id: number,
    @Body() createSiteDto: CreateSiteDto,
  ) {
    return this.userSitesService.createUserSite(user_id, createSiteDto);
  }

  @UseGuards(AtGuard)
  @Get('getSites')
  async getSites(@GetCurrentUserId() user_id: number) {
    return this.userSitesService.getUserSites(user_id);
  }

  @UseGuards(AtGuard)
  @Get('getSiteById/:site_id')
  async getSiteById(
    @GetCurrentUserId() user_id: number,
    @Param('site_id', ParseIntPipe) site_id: number,
  ) {
    return this.userSitesService.getSiteById(user_id, site_id);
  }

  @UseGuards(AtGuard)
  @Patch('updateSiteById/:site_id')
  async updateSite(
    @GetCurrentUserId() user_id: number,
    @Param('site_id', ParseIntPipe) site_id: number,
    @Body() updateSiteDto: CreateSiteDto,
  ) {
    console.log(updateSiteDto);
    return this.userSitesService.updateSiteById(user_id, site_id, updateSiteDto);
  }

  @UseGuards(AtGuard)
  @Delete('deleteSiteById/:site_id')
  async deleteSite(
    @GetCurrentUserId() user_id: number,
    @Param('site_id', ParseIntPipe) site_id: number,
  ) {
    return this.userSitesService.deleteSiteById(user_id, site_id);
  }
}
