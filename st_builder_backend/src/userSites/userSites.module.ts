import { Module } from "@nestjs/common";
import { UserSitesController } from "./userSites.controller";
import { UserSitesService } from "./userSites.service";

@Module({
  controllers: [UserSitesController],
  providers: [UserSitesService],
})
export class UserSitesModule {}