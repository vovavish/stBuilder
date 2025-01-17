import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateSiteDto } from "./dto/CreateSiteDto";

@Injectable()
export class UserSitesService {
  constructor(private prisma: PrismaService) {}

  async createUserSite(user_id: number, createSiteDto: CreateSiteDto) {
    return this.prisma.usersSites.create({
      data: {
        user_id,
        site_data: createSiteDto.site_data,
        site_address: createSiteDto.site_address,
        site_name: createSiteDto.site_name,
      },
    })
  }

  async getUserSites(user_id: number) {
    return await this.prisma.usersSites.findMany({
      where: {
        user_id,
      },
      select: {
        id: true,
        site_name: true,
        site_address: true,
      },
      orderBy: {
        id: "asc",
      },
    });
  }

  async getSiteById(user_id: number, site_id: number) {
    const site =  await this.prisma.usersSites.findUnique({
      where: {
        id: site_id,
        user_id: user_id,
      },
    });

    if (!site) {
      throw new NotFoundException(`Site with ID ${site_id} not found`);
    }

    return site;
  }

  async updateSiteById(user_id: number, site_id: number, updateSiteDto: CreateSiteDto) {
    const site = await this.prisma.usersSites.findUnique({
      where: { id: site_id },
    });

    if (!site) {
      throw new NotFoundException(`Site with ID ${site_id} not found`);
    }

    return this.prisma.usersSites.update({
      where: { id: site_id },
      data: updateSiteDto,
    });
  }

  async deleteSiteById(user_id: number, site_id: number) {
    const site = await this.prisma.usersSites.findUnique({
      where: { id: site_id },
    });

    if (!site) {
      throw new NotFoundException(`Site with ID ${site_id} not found`);
    }

    return this.prisma.usersSites.delete({
      where: { id: site_id },
    });
  }
}