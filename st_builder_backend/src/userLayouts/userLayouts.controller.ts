import { Controller, Get, Post, Param, Body, Delete, Patch, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CreateUserLayoutDto } from './dto/CreateUserLayoutDto';
import { AtGuard } from 'src/common/guadrs';
import { UserLayoutsService } from './userLayouts.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { UpdateUserLayoutDto } from './dto/UpdateUserLayoutDto';

@Controller('user-layouts')
export class UserLayoutsController {
  constructor(private readonly userLayoutsService: UserLayoutsService) {}

  @Roles(Role.Admin)
  @UseGuards(AtGuard)
  @Post('/')
  async createUserLayout(
    @Body() createUserLayoutDto: CreateUserLayoutDto,
  ) {
    return this.userLayoutsService.createUserLayout(createUserLayoutDto);
  }

  @UseGuards(AtGuard)
  @Get('/')
  async getUserLayouts() {
    return this.userLayoutsService.getUserLayouts();
  }

  @Roles(Role.Admin)
  @UseGuards(AtGuard)
  @Get('/getAllAdmin')
  async getAllUserLayoutsAdmin() {
    return this.userLayoutsService.getAllUserLayoutsAdmin();
  }

  @UseGuards(AtGuard)
  @Get('/admin/:layout_id')
  async getUserLayoutByIdAdmin(
    @Param('layout_id', ParseIntPipe) layout_id: number,
  ) {
    return this.userLayoutsService.getUserLayoutByIdAdmin(layout_id);
  }

  @UseGuards(AtGuard)
  @Get('/:layout_id')
  async getUserLayoutById(
    @Param('layout_id', ParseIntPipe) layout_id: number,
  ) {
    return this.userLayoutsService.getUserLayoutById(layout_id);
  }

  @Roles(Role.Admin)
  @UseGuards(AtGuard)
  @Patch('/:layout_id')
  async updateUserLayout(
    @Param('layout_id', ParseIntPipe) layout_id: number,
    @Body() updateUserLayoutDto: UpdateUserLayoutDto,
  ) {
    console.log(updateUserLayoutDto);
    return this.userLayoutsService.updateUserLayoutById(layout_id, updateUserLayoutDto);
  }

  @Roles(Role.Admin)
  @UseGuards(AtGuard)
  @Delete('/:layout_id')
  async deleteUserLayout(
    @Param('layout_id', ParseIntPipe) layout_id: number,
  ) {
    return this.userLayoutsService.deleteUserLayoutById(layout_id);
  }
}
