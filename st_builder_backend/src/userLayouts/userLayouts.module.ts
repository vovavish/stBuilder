import { Module } from "@nestjs/common";
import { UserLayoutsService } from "./userLayouts.service";
import { UserLayoutsController } from "./userLayouts.controller";

@Module({
  controllers: [UserLayoutsController],
  providers: [UserLayoutsService],
})
export class UserLayoutsModule {}