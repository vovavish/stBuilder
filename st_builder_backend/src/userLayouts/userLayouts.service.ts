import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserLayoutDto } from "./dto/CreateUserLayoutDto";

@Injectable()
export class UserLayoutsService {
  constructor(private prisma: PrismaService) {}

  async createUserLayout(createUserLayoutDto: CreateUserLayoutDto) {
    return this.prisma.layouts.create({
      data: {
        name: createUserLayoutDto.name,
        layout_data: createUserLayoutDto.layout_data,
        description: createUserLayoutDto.description,
        path_to_image: createUserLayoutDto.path_to_image
      },
    })
  }

  async getUserLayouts() {
    return await this.prisma.layouts.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        path_to_image: true,
      },
      orderBy: {
        id: "asc",
      },
    });
  }

  async getUserLayoutById(layout_id: number) {
    const userLayout =  await this.prisma.layouts.findUnique({
      where: {
        id: layout_id,
      },
    });

    if (!userLayout) {
      throw new NotFoundException(`Layout with ID ${layout_id} not found`);
    }

    return userLayout;
  }

  async updateUserLayoutById(layout_id: number, createUserLayoutDto: CreateUserLayoutDto) {
    const site = await this.prisma.layouts.findUnique({
      where: { id: layout_id },
    });

    if (!site) {
      throw new NotFoundException(`Layout with ID ${layout_id} not found`);
    }

    return this.prisma.layouts.update({
      where: { id: layout_id },
      data: createUserLayoutDto,
    });
  }

  async deleteUserLayoutById(layout_id: number) {
    const site = await this.prisma.layouts.findUnique({
      where: { id: layout_id },
    });

    if (!site) {
      throw new NotFoundException(`Layout with ID ${layout_id} not found`);
    }

    return this.prisma.layouts.delete({
      where: { id: layout_id },
    });
  }
}